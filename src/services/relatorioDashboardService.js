import { Op } from "sequelize";
import Auditoria from "../models/Auditoria.js";
import Vendas from "../models/Vendas.js";
import AvOperacional from "../models/Avoperacional.js"; // ajuste se o nome for outro
import Loja from "../models/Loja.js"; // opcional (só se for usar lojaId com meta)

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

const round2 = (n) => Number(Number(n || 0).toFixed(2));

function mesLabel(m) {
  const nomes = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  return nomes[m - 1] ?? String(m);
}

function lastNMonthsFrom(ano, mes, n) {
  // retorna [{mes,ano}] do mais antigo -> mais recente
  const base = new Date(ano, mes - 1, 1);
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(base.getFullYear(), base.getMonth() - i, 1);
    out.push({ mes: d.getMonth() + 1, ano: d.getFullYear() });
  }
  return out;
}

class RelatorioDashboardService {
  async gerar({ scope = "mes", lojaId = null, mes = null, ano = null }) {
    const { mes: mNow, ano: aNow } = nowMesAno();
    const M = mes ?? mNow;
    const A = ano ?? aNow;

    // scope:
    // mes  => somente o mês A/M
    // ano  => últimos 12 meses até A/M (inclui A/M)
    const isAno = String(scope) === "ano";

    // filtro de loja (opcional; se não passar, é "todas")
    const lojaWhere = lojaId ? { lojaId } : {};

    // =========================
    // PERÍODO PRINCIPAL
    // =========================
    const period = isAno
      ? (() => {
          const start = new Date(A, M - 1, 1, 0, 0, 0);
          start.setMonth(start.getMonth() - 11); // volta 11 meses (total 12 incluindo atual)
          const end = new Date(A, M, 1, 0, 0, 0); // início do mês seguinte
          return { start, end };
        })()
      : rangeMes(A, M);

    // =========================
    // AUDITORIAS no período
    // =========================
    const auditoriaWhere = {
      ...lojaWhere,
      data: { [Op.gte]: period.start, [Op.lt]: period.end },
    };

    // pega auditorias (id + lojaId)
    const auditorias = await Auditoria.findAll({
      where: auditoriaWhere,
      attributes: ["id", "lojaId"],
      raw: true,
    });

    const auditoriaIds = auditorias.map((a) => a.id);
    const totalAuditorias = auditorias.length;

    // lojas auditadas (distintas) no período
    const lojasAuditadasSet = new Set(auditorias.map((a) => a.lojaId).filter(Boolean));
    const totalLojasAuditadas = lojasAuditadasSet.size;

    // =========================
    // VENDAS no período (somatório valor e contagem)
    // =========================
    let totalVendasValor = 0;
    let totalVendasCount = 0;

    if (auditoriaIds.length) {
      const vendas = await Vendas.findAll({
        where: { auditoriaId: { [Op.in]: auditoriaIds } },
        attributes: ["valor"],
        raw: true,
      });
      totalVendasCount = vendas.length;
      totalVendasValor = vendas.reduce((acc, v) => acc + toNumberBR(v.valor), 0);
    }

    // =========================
    // PONTUAÇÃO MÉDIA (Questionário) no período
    // média simples por resposta (nota)
    // =========================
    let pontuacaoMedia = 0;
    let respostasCount = 0;

    if (auditoriaIds.length) {
      const respostas = await AvOperacional.findAll({
        where: { auditoriaId: { [Op.in]: auditoriaIds } },
        attributes: ["nota"],
        raw: true,
      });
      respostasCount = respostas.length;
      const soma = respostas.reduce((acc, r) => acc + Number(r.nota ?? 0), 0);
      pontuacaoMedia = respostasCount ? round2(soma / respostasCount) : 0;
    }

    // =========================
    // SÉRIE: Auditorias por mês (para gráfico)
    // - se scope=mes: últimos 6 meses
    // - se scope=ano: últimos 12 meses
    // =========================
    const serieMonths = lastNMonthsFrom(A, M, isAno ? 12 : 6);
    const auditoriasPorMes = [];

    for (const mm of serieMonths) {
      const { start, end } = rangeMes(mm.ano, mm.mes);
      const list = await Auditoria.findAll({
        where: {
          ...lojaWhere,
          data: { [Op.gte]: start, [Op.lt]: end },
        },
        attributes: ["id", "lojaId"],
        raw: true,
      });

      const lojasSet = new Set(list.map((x) => x.lojaId).filter(Boolean));

      auditoriasPorMes.push({
        label: `${mesLabel(mm.mes)}/${String(mm.ano).slice(-2)}`,
        mes: mm.mes,
        ano: mm.ano,
        totalAuditorias: list.length,
        lojasAuditadas: lojasSet.size,
      });
    }

    // =========================
    // META opcional de loja (se filtrou por loja)
    // =========================
    let lojaMeta = null;
    if (lojaId) {
      const loja = await Loja.findByPk(lojaId, { raw: true });
      lojaMeta = {
        lojaId,
        lojaCodigo: loja?.codigo ?? loja?.codLoja ?? loja?.id ?? lojaId,
        lojaNome: loja?.descricao ?? loja?.name ?? loja?.nmLoja ?? "—",
      };
    }

    return {
      meta: {
        scope: isAno ? "ano" : "mes",
        mes: M,
        ano: A,
        periodo: {
          inicio: period.start.toISOString().slice(0, 10),
          fim: period.end.toISOString().slice(0, 10),
        },
        ...(lojaMeta ? lojaMeta : {}),
      },
      kpis: {
        totalAuditorias,
        totalLojasAuditadas,
        totalVendasValor: round2(totalVendasValor),
        totalVendasCount,
        pontuacaoMedia,
      },
      charts: {
        auditoriasPorMes, // inclui também lojasAuditadas por mês
      },
      debug: {
        auditoriasNoFiltro: auditoriaIds.length,
        respostasCount,
      },
    };
  }
}

export default new RelatorioDashboardService();