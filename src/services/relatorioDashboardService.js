import { Op } from "sequelize";
import Auditoria from "../models/Auditoria.js";
import Vendas from "../models/Vendas.js";
import Loja from "../models/Loja.js";
import AvOperacional from "../models/Avoperacional.js";

function rangeMes(ano, mes) {
  const start = new Date(ano, mes - 1, 1, 0, 0, 0);
  const end = new Date(ano, mes, 1, 0, 0, 0);
  return { start, end };
}

function nowMesAno() {
  const n = new Date();
  return { mes: n.getMonth() + 1, ano: n.getFullYear() };
}

function toNumberBR(v) {
  if (v === null || v === undefined) return 0;
  const s = String(v).trim();
  const n = Number(s.replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

function round2(n) {
  return Number(Number(n || 0).toFixed(2));
}

function lastNMonths(n = 6) {
  const base = new Date();
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(base.getFullYear(), base.getMonth() - i, 1);
    out.push({ mes: d.getMonth() + 1, ano: d.getFullYear() });
  }
  return out;
}

function mesLabel(m) {
  const nomes = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  return nomes[m - 1] ?? String(m);
}

class RelatorioDashboardService {
  async gerar({ scope = "mes", lojaId = null, mes = null, ano = null }) {
    const isMes = scope === "mes";

    const { mes: mNow, ano: aNow } = nowMesAno();
    const M = mes ?? mNow;
    const A = ano ?? aNow;

    // filtro de tempo
    const timeWhere = isMes ? rangeMes(A, M) : null;

    // filtro de loja
    const lojaWhere = lojaId ? { lojaId } : {};

    // meta loja
    let lojaMeta = null;
    if (lojaId) {
      const loja = await Loja.findByPk(lojaId, { raw: true });
      lojaMeta = {
        lojaId,
        lojaCodigo: loja?.codigo ?? loja?.codLoja ?? loja?.id ?? lojaId,
        lojaNome: loja?.descricao ?? loja?.name ?? loja?.nmLoja ?? "—",
      };
    }

    // =========================
    // 1) Auditorias (count) e pendentes (opcional)
    // =========================
    const auditoriaWhere = {
      ...lojaWhere,
      ...(isMes ? { data: { [Op.gte]: timeWhere.start, [Op.lt]: timeWhere.end } } : {}),
    };

    const totalAuditorias = await Auditoria.count({ where: auditoriaWhere });

    // pendentes: só funciona se você tiver algum campo tipo status/situacao
    let auditoriasPendentes = null;
    if (Auditoria.rawAttributes?.status || Auditoria.rawAttributes?.situacao) {
      const field = Auditoria.rawAttributes?.status ? "status" : "situacao";
      auditoriasPendentes = await Auditoria.count({
        where: {
          ...auditoriaWhere,
          [field]: { [Op.in]: ["PENDENTE", "pendente", 0, false] },
        },
      });
    } else {
      auditoriasPendentes = 0; // fallback
    }

    // =========================
    // 2) Total de vendas (somatório Vendas.valor)
    // =========================
    // Pegamos as auditorias no período e somamos Vendas por auditoriaId (pra respeitar loja/tempo)
    const auditoriasIds = await Auditoria.findAll({
      where: auditoriaWhere,
      attributes: ["id"],
      raw: true,
    });
    const ids = auditoriasIds.map((x) => x.id);

    let totalVendasValor = 0;
    let totalVendasCount = 0;

    if (ids.length) {
      const vendas = await Vendas.findAll({
        where: { auditoriaId: { [Op.in]: ids } },
        attributes: ["valor"],
        raw: true,
      });

      totalVendasValor = vendas.reduce((acc, v) => acc + toNumberBR(v.valor), 0);
      totalVendasCount = vendas.length;
    }

    // =========================
    // 3) Pontuação média do questionário (AvOperacional.nota)
    // =========================
    let pontuacaoMedia = 0;
    let respostasCount = 0;

    if (ids.length) {
      const respostas = await AvOperacional.findAll({
        where: { auditoriaId: { [Op.in]: ids } },
        attributes: ["nota"],
        raw: true,
      });

      respostasCount = respostas.length;
      const soma = respostas.reduce((acc, r) => acc + Number(r.nota ?? 0), 0);
      pontuacaoMedia = respostasCount ? round2(soma / respostasCount) : 0;
    }

    // =========================
    // 4) Auditorias por mês (série para o gráfico)
    // - Para "mes": últimos 6 meses
    // - Para "geral": últimos 12 meses (ou 24, se quiser)
    // =========================
    const monthsList = lastNMonths(isMes ? 6 : 12);

    const auditoriasPorMes = [];
    for (const mm of monthsList) {
      const { start, end } = rangeMes(mm.ano, mm.mes);
      const count = await Auditoria.count({
        where: {
          ...lojaWhere,
          data: { [Op.gte]: start, [Op.lt]: end },
        },
      });
      auditoriasPorMes.push({
        label: `${mesLabel(mm.mes)}/${String(mm.ano).slice(-2)}`,
        mes: mm.mes,
        ano: mm.ano,
        total: count,
      });
    }

    // =========================
    // 5) Formas de pagamento (opcional)
    // Depende do teu schema: ex "forma_pagamento" em Vendas
    // =========================
    let formasPagamento = [];
    if (Vendas.rawAttributes?.formaPagamento || Vendas.rawAttributes?.forma_pagamento) {
      const fField = Vendas.rawAttributes?.formaPagamento ? "formaPagamento" : "forma_pagamento";
      const vendasFP = ids.length
        ? await Vendas.findAll({
            where: { auditoriaId: { [Op.in]: ids } },
            attributes: [fField],
            raw: true,
          })
        : [];

      const map = new Map();
      for (const v of vendasFP) {
        const key = String(v[fField] ?? "Não informado");
        map.set(key, (map.get(key) ?? 0) + 1);
      }
      formasPagamento = Array.from(map.entries()).map(([name, value]) => ({ name, value }));
    } else {
      // fallback (pra não quebrar o gráfico no front)
      formasPagamento = [];
    }

    // =========================
    // payload final
    // =========================
    return {
      meta: {
        scope: isMes ? "mes" : "geral",
        mes: M,
        ano: A,
        ...(lojaMeta ? lojaMeta : {}),
      },
      kpis: {
        totalAuditorias,
        auditoriasPendentes,
        totalVendasValor: round2(totalVendasValor),
        totalVendasCount,
        pontuacaoMedia, // 0..10
      },
      charts: {
        auditoriasPorMes,
        formasPagamento,
      },
      debug: {
        auditoriasNoFiltro: ids.length,
        respostasCount,
      },
    };
  }
}

export default new RelatorioDashboardService();