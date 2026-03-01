import { Op } from "sequelize";

import Auditoria from "../models/Auditoria.js";
import Fluxo from "../models/Fluxo.js";
import Vendas from "../models/Vendas.js";
import Perdas from "../models/Perdas.js";

const DOW = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

function getStartEnd(mes, ano) {
  const start = new Date(ano, mes - 1, 1, 0, 0, 0);
  const end = new Date(ano, mes, 1, 0, 0, 0);
  return { start, end };
}

function dayOfWeekLabel(date) {
  const d = date.getDay(); // 0 dom ... 6 sab
  const map = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6 };
  return DOW[map[d]];
}

function weekOfMonth(date) {
  return Math.floor((date.getDate() - 1) / 7) + 1; // 1..6
}

function initByDow(template) {
  const obj = {};
  for (const dia of DOW) obj[dia] = JSON.parse(JSON.stringify(template));
  return obj;
}

function sumObj(obj) {
  return Object.values(obj).reduce((a, v) => a + (Number(v) || 0), 0);
}

function toNumberBR(v) {
  if (v === null || v === undefined) return 0;
  // suporta "1.234,56" e "1234.56"
  const s = String(v).trim();
  const n = Number(s.replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

function pickExistingAttrs(Model, attrs) {
  const cols = Object.keys(Model.rawAttributes);
  return attrs.filter((a) => cols.includes(a));
}

// total + total geral + participação (%)
function withTotalsAndPctByDow(block) {
  const rows = {};
  const keys = Object.keys(block[DOW[0]]);

  const totalGeral = {};
  for (const k of keys) totalGeral[k] = 0;

  for (const dia of DOW) {
    const total = sumObj(block[dia]);
    rows[dia] = { ...block[dia], total };
    for (const k of keys) totalGeral[k] += Number(block[dia][k] || 0);
  }

  const totalAll = sumObj(totalGeral);
  const pct = (n) =>
    totalAll > 0 ? Math.round((Number(n || 0) / totalAll) * 100) : 0;

  const participacaoPct = {};
  for (const k of keys) participacaoPct[k] = pct(totalGeral[k]);
  participacaoPct.total = 100;

  return {
    rows,
    totalGeral: { ...totalGeral, total: totalAll },
    participacaoPct,
  };
}

const norm = (s = "") =>
  String(s)
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();

function classifyFluxoCategoria(catRaw) {
  const cat = norm(catRaw);

  // Ajuste fino aqui se teus textos forem diferentes
  if (cat.includes("acomp")) return "acompanhantes";
  if (cat.includes("ident") && cat.includes("perd"))
    return "vendasPerdidasIdentificadas";
  if ((cat.includes("poss") || cat.includes("possive")) && cat.includes("perd"))
    return "possiveisVendasPerdidas";
  if (cat.includes("outro")) return "outros";

  // se vier "vendas realizadas" no fluxo, você pode mapear, mas eu prefiro vendas = tabela Vendas
  // if (cat.includes("venda") && cat.includes("real")) return "vendasRealizadas";

  // fallback
  return "outros";
}

function classifyPerdaMotivo(p) {
  // 1) Se teu model já tem colunas tipo p.preco, p.atendimento, etc -> vamos usar direto no loop (abaixo)
  // 2) Se tua perda for "uma linha por motivo", tente achar o motivo aqui:
  const raw = String(
    p.motivo ?? p.bucket ?? p.motivoNome ?? p.descricao ?? "outros",
  );
  const m = norm(raw);

  if (m.includes("preco")) return "preco";
  if (m.includes("falta") || m.includes("mercadoria")) return "faltaMercadoria";
  if (
    m.includes("mod") ||
    m.includes("modelo") ||
    m.includes("cor") ||
    m.includes("taman")
  )
    return "modCorTamanho";
  if (m.includes("pag") || m.includes("forma")) return "formaPagamento";
  if (m.includes("atend")) return "atendimento";
  return "outros";
}

class RelatorioMensalService {
  async gerar({ lojaId, mes, ano }) {
    const { start, end } = getStartEnd(mes, ano);

    // 1) auditorias do mês (base)
    const auditorias = await Auditoria.findAll({
      where: {
        lojaId,
        data: { [Op.gte]: start, [Op.lt]: end },
      },
      order: [["data", "ASC"]],
      raw: true,
    });

    const auditoriaIds = auditorias.map((a) => a.id);

    // retorno vazio já no formato certo (igual prints)
    if (auditoriaIds.length === 0) {
      return {
        lojaId,
        mes,
        ano,
        totalAuditado: 0,

        perfilClientesCompradores: withTotalsAndPctByDow(
          initByDow({
            masculino: 0,
            feminino: 0,
            crianca: 0,
            jovem: 0,
            adulto: 0,
            idoso: 0,
          }),
        ),

        fluxoPessoasPorDiaSemana: withTotalsAndPctByDow(
          initByDow({
            vendasRealizadas: 0,
            acompanhantes: 0,
            vendasPerdidasIdentificadas: 0,
            possiveisVendasPerdidas: 0,
            trocas: 0,
            outros: 0,
          }),
        ),

        fluxoPessoasPorSemana: {
          rows: Object.fromEntries(
            DOW.map((dia) => [
              dia,
              { w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, total: 0 },
            ]),
          ),
          totalGeral: { w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, total: 0 },
          participacaoPct: {
            w1: 0,
            w2: 0,
            w3: 0,
            w4: 0,
            w5: 0,
            w6: 0,
            total: 100,
          },
        },

        vendasPerdidasPorDiaSemana: withTotalsAndPctByDow(
          initByDow({
            preco: 0,
            faltaMercadoria: 0,
            modCorTamanho: 0,
            formaPagamento: 0,
            atendimento: 0,
            outros: 0,
          }),
        ),

        aproveitamentoVendas: {
          rows: Object.fromEntries(
            DOW.map((dia) => [
              dia,
              { fluxoPessoas: 0, numeroVendas: 0, aproveitamento: 0 },
            ]),
          ),
          totalGeral: { fluxoPessoas: 0, numeroVendas: 0, aproveitamento: 0 },
        },

        meta: { auditorias: 0, fluxos: 0, vendas: 0, perdas: 0 },
      };
    }

    // 2) buscar filhos por auditoriaId
    const [fluxos, vendas, perdas] = await Promise.all([
      Fluxo.findAll({
        where: { lojaId, auditoriaId: { [Op.in]: auditoriaIds } },
        attributes: pickExistingAttrs(Fluxo, [
          "auditoriaId",
          "categoria",
          "quantidade",
        ]),
        raw: true,
      }),

      Vendas.findAll({
        where: { auditoriaId: { [Op.in]: auditoriaIds } },
        attributes: pickExistingAttrs(Vendas, [
          "auditoriaId",
          "troca",
          "valor",
          "faixaetaria",
        ]), // ✅ sem sexo
        raw: true,
      }),

      Perdas.findAll({
        where: { auditoriaId: { [Op.in]: auditoriaIds } },
        raw: true,
      }),
    ]);

    // maps auditoriaId -> dia/semana
    const auditInfo = new Map();
    for (const a of auditorias) {
      const dt = new Date(a.data);
      auditInfo.set(a.id, {
        date: dt,
        dia: dayOfWeekLabel(dt),
        semana: weekOfMonth(dt), // 1..6
      });
    }

    // 3) totalAuditado
    const totalAuditado = auditorias.reduce(
      (acc, a) => acc + Number(a.valor_auditado ?? a.valor ?? 0),
      0,
    );

    // Total vendido no mês (somatório do campo valor)
    const totalVendidoMes = vendas.reduce(
      (acc, v) => acc + toNumberBR(v.valor),
      0,
    );

    // ===========================
    // 1) PERFIL CLIENTES (Compradores) — vem de Auditoria (igual teu print)
    // ===========================
    const perfil = initByDow({
      masculino: 0,
      feminino: 0,
      crianca: 0,
      jovem: 0,
      adulto: 0,
      idoso: 0,
    });

    for (const a of auditorias) {
      const info = auditInfo.get(a.id);
      if (!info) continue;
      const dia = info.dia;

      perfil[dia].masculino += Number(a.masculino || 0);
      perfil[dia].feminino += Number(a.feminino || 0);
      perfil[dia].crianca += Number(a.crianca || 0);
      perfil[dia].jovem += Number(a.jovem || 0);
      perfil[dia].adulto += Number(a.adulto || 0);
      perfil[dia].idoso += Number(a.idoso || 0);
    }

    // ===========================
    // 2) FLUXO por DIA da semana (colunas do print 2)
    // ===========================
    const fluxoPorDia = initByDow({
      vendasRealizadas: 0,
      acompanhantes: 0,
      vendasPerdidasIdentificadas: 0,
      possiveisVendasPerdidas: 0,
      trocas: 0,
      outros: 0,
    });

    // 👉 Para acertar o Fluxo por Semana e Aproveitamento, vamos montar também o fluxo POR AUDITORIA
    const fluxoPorAuditoria = new Map();
    const initFluxoAudit = () => ({
      vendasRealizadas: 0,
      acompanhantes: 0,
      vendasPerdidasIdentificadas: 0,
      possiveisVendasPerdidas: 0,
      trocas: 0,
      outros: 0,
    });

    for (const id of auditoriaIds) fluxoPorAuditoria.set(id, initFluxoAudit());

    // VENDAS: vendas realizadas + trocas
    for (const v of vendas) {
      const info = auditInfo.get(v.auditoriaId);
      if (!info) continue;

      // 1 venda = 1 venda realizada (igual teu print)
      fluxoPorDia[info.dia].vendasRealizadas += 1;
      fluxoPorAuditoria.get(v.auditoriaId).vendasRealizadas += 1;

      if (v.troca) {
        fluxoPorDia[info.dia].trocas += 1;
        fluxoPorAuditoria.get(v.auditoriaId).trocas += 1;
      }
    }

    // FLUXO: acompanhantes/outros/perdidas (ident/poss)
    for (const f of fluxos) {
      const info = auditInfo.get(f.auditoriaId);
      if (!info) continue;

      const qtd = Number(f.quantidade || 0);
      const col = classifyFluxoCategoria(f.categoria);

      fluxoPorDia[info.dia][col] += qtd;
      fluxoPorAuditoria.get(f.auditoriaId)[col] += qtd;
    }

    // ===========================
    // 3) FLUXO por SEMANA (print 3)
    // - cada célula: SOMA do total do fluxo daquela auditoria (no dia da semana) dentro da semana 1..6
    // ===========================
    const semanaBlock = {};
    for (const dia of DOW)
      semanaBlock[dia] = { w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0 };

    for (const a of auditorias) {
      const info = auditInfo.get(a.id);
      const fa = fluxoPorAuditoria.get(a.id);
      if (!info || !fa) continue;

      const totalAudit =
        fa.vendasRealizadas +
        fa.acompanhantes +
        fa.vendasPerdidasIdentificadas +
        fa.possiveisVendasPerdidas +
        fa.trocas +
        fa.outros;

      const wKey = `w${info.semana}`; // w1..w6
      if (semanaBlock[info.dia]?.[wKey] !== undefined) {
        semanaBlock[info.dia][wKey] += totalAudit;
      }
    }

    // total e % por semana (base = total geral)
    const semanaRows = {};
    const semanaTotals = { w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0 };

    for (const dia of DOW) {
      const row = semanaBlock[dia];
      const total = sumObj(row);
      semanaRows[dia] = { ...row, total };
      semanaTotals.w1 += row.w1;
      semanaTotals.w2 += row.w2;
      semanaTotals.w3 += row.w3;
      semanaTotals.w4 += row.w4;
      semanaTotals.w5 += row.w5;
      semanaTotals.w6 += row.w6;
    }

    const semanaTotalAll = sumObj(semanaTotals);
    const pctSem = (n) =>
      semanaTotalAll > 0
        ? Math.round((Number(n || 0) / semanaTotalAll) * 100)
        : 0;

    const semanaParticipacaoPct = {
      w1: pctSem(semanaTotals.w1),
      w2: pctSem(semanaTotals.w2),
      w3: pctSem(semanaTotals.w3),
      w4: pctSem(semanaTotals.w4),
      w5: pctSem(semanaTotals.w5),
      w6: pctSem(semanaTotals.w6),
      total: 100,
    };

    const fluxoPessoasPorSemana = {
      rows: semanaRows,
      totalGeral: { ...semanaTotals, total: semanaTotalAll },
      participacaoPct: semanaParticipacaoPct,
    };

    // ===========================
    // 4) VENDAS PERDIDAS (print 4) — por dia da semana por motivo
    // Suporta 2 formatos:
    // A) uma linha por perda com "motivo" (conta 1)
    // B) colunas (preco, atendimento...) (soma valores)
    // ===========================
    const perdasPorDia = initByDow({
      preco: 0,
      faltaMercadoria: 0,
      modCorTamanho: 0,
      formaPagamento: 0,
      atendimento: 0,
      outros: 0,
    });

    for (const p of perdas) {
      const info = auditInfo.get(p.auditoriaId);
      if (!info) continue;

      // Formato B (colunas):
      const hasCols =
        p.preco !== undefined ||
        p.falta_mercadoria !== undefined ||
        p.mod_cor_tamanho !== undefined ||
        p.forma_pagamento !== undefined ||
        p.atendimento !== undefined ||
        p.outros !== undefined;

      if (hasCols) {
        perdasPorDia[info.dia].preco += Number(p.preco || 0);
        perdasPorDia[info.dia].faltaMercadoria += Number(
          p.falta_mercadoria || 0,
        );
        perdasPorDia[info.dia].modCorTamanho += Number(p.mod_cor_tamanho || 0);
        perdasPorDia[info.dia].formaPagamento += Number(p.forma_pagamento || 0);
        perdasPorDia[info.dia].atendimento += Number(p.atendimento || 0);
        perdasPorDia[info.dia].outros += Number(p.outros || 0);
      } else {
        // Formato A (motivo):
        const key = classifyPerdaMotivo(p);
        const qtd = Number(p.quantidade || p.qtd || 1);
        perdasPorDia[info.dia][key] += qtd;
      }
    }

    // ===========================
    // 6) APROVEITAMENTO (print 6)
    // ===========================
    const fluxoDiaComputed = withTotalsAndPctByDow(fluxoPorDia);

    const aproveitamentoRows = {};
    for (const dia of DOW) {
      const fluxoTotalDia = fluxoDiaComputed.rows[dia].total;
      const numVendas = Number(
        fluxoDiaComputed.rows[dia].vendasRealizadas || 0,
      );
      const perc = fluxoTotalDia > 0 ? (numVendas / fluxoTotalDia) * 100 : 0;

      aproveitamentoRows[dia] = {
        fluxoPessoas: fluxoTotalDia,
        numeroVendas: numVendas,
        aproveitamento: Number(perc.toFixed(2)),
      };
    }

    const aproveitamentoTotalFluxo = fluxoDiaComputed.totalGeral.total;
    const aproveitamentoTotalVendas =
      fluxoDiaComputed.totalGeral.vendasRealizadas;
    const aproveitamentoTotalPerc =
      aproveitamentoTotalFluxo > 0
        ? (aproveitamentoTotalVendas / aproveitamentoTotalFluxo) * 100
        : 0;

    // ===========================
    // Retorno final (igual às tabelas)
    // ===========================
    return {
      lojaId,
      mes,
      ano,
      totalAuditado,
      totalVendidoMes,

      // 1
      perfilClientesCompradores: withTotalsAndPctByDow(perfil),

      // 2
      fluxoPessoasPorDiaSemana: fluxoDiaComputed,

      // 3
      fluxoPessoasPorSemana,

      // 4
      vendasPerdidasPorDiaSemana: withTotalsAndPctByDow(perdasPorDia),

      // 6
      aproveitamentoVendas: {
        rows: aproveitamentoRows,
        totalGeral: {
          fluxoPessoas: aproveitamentoTotalFluxo,
          numeroVendas: aproveitamentoTotalVendas,
          aproveitamento: Number(aproveitamentoTotalPerc.toFixed(2)),
        },
      },

      meta: {
        auditorias: auditorias.length,
        fluxos: fluxos.length,
        vendas: vendas.length,
        perdas: perdas.length,
      },
    };
  }
}

export default new RelatorioMensalService();
