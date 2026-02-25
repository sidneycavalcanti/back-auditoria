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

function withTotalsByDow(block) {
  const rows = {};
  const keys = Object.keys(block[DOW[0]]);
  const totalGeral = {};
  for (const k of keys) totalGeral[k] = 0;

  for (const dia of DOW) {
    rows[dia] = { ...block[dia], total: sumObj(block[dia]) };
    for (const k of keys) totalGeral[k] += Number(block[dia][k] || 0);
  }
  return { rows, totalGeral: { ...totalGeral, total: sumObj(totalGeral) } };
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
    if (auditoriaIds.length === 0) {
      return {
        lojaId,
        mes,
        ano,
        totalAuditado: 0,
        perfilClientesCompradores: withTotalsByDow(
          initByDow({
            masculino: 0,
            feminino: 0,
            crianca: 0,
            jovem: 0,
            adulto: 0,
            idoso: 0,
          }),
        ),
        fluxoPessoasPorDiaSemana: withTotalsByDow(
          initByDow({
            vendasRealizadas: 0,
            acompanhantes: 0,
            vendasPerdidas: 0,
            trocas: 0,
            outros: 0,
          }),
        ),
        fluxoPessoasPorSemana: {},
        vendasPerdidasPorDiaSemana: withTotalsByDow(
          initByDow({
            preco: 0,
            faltaMercadoria: 0,
            modCorTamanho: 0,
            formaPagamento: 0,
            atendimento: 0,
            outros: 0,
          }),
        ),
        aproveitamentoVendas: {},
        meta: { auditorias: 0 },
      };
    }

    // 2) buscar filhos por auditoriaId (sem depender de data no model Fluxo)
    const [fluxos, vendas, perdas] = await Promise.all([
      // Fluxo TEM lojaId (seu model mostrou)
      Fluxo.findAll({
        where: { lojaId, auditoriaId: { [Op.in]: auditoriaIds } },
        attributes: ["auditoriaId", "categoria", "sexo", "quantidade"],
        raw: true,
      }),

      // Vendas: pode ou não ter lojaId (pra não quebrar, filtra só por auditoriaId)
      Vendas.findAll({
        where: { auditoriaId: { [Op.in]: auditoriaIds } },
        raw: true,
      }),

      // Perdas: NÃO tem lojaId (erro confirmou)
      Perdas.findAll({
        where: { auditoriaId: { [Op.in]: auditoriaIds } },
        raw: true,
      }),
    ]);

    // mapa auditoriaId -> data
    const auditDate = new Map(auditorias.map((a) => [a.id, new Date(a.data)]));

    // 3) totalAuditado
    const totalAuditado = auditorias.reduce(
      (acc, a) => acc + Number(a.valor_auditado ?? a.valor ?? 0),
      0,
    );

    // 4) Perfil clientes compradores (usa campos na auditoria)
    // ⚠️ Ajuste os nomes se forem diferentes nos seus campos de Auditoria
    const perfil = initByDow({
      masculino: 0,
      feminino: 0,
      crianca: 0,
      jovem: 0,
      adulto: 0,
      idoso: 0,
    });

    for (const a of auditorias) {
      const dia = dayOfWeekLabel(new Date(a.data));
      perfil[dia].masculino += Number(a.masculino || 0);
      perfil[dia].feminino += Number(a.feminino || 0);
      perfil[dia].crianca += Number(a.crianca || 0);
      perfil[dia].jovem += Number(a.jovem || 0);
      perfil[dia].adulto += Number(a.adulto || 0);
      perfil[dia].idoso += Number(a.idoso || 0);
    }

    // 5) Fluxo por dia da semana
    // Seu model Fluxo tem categoria (especulador/acompanhante/outros) e sexo, quantidade.
    // Você quer: vendas realizadas / acompanhantes / vendas perdidas / trocas / outros.
    // Então: você precisa dizer onde estão “vendas realizadas / perdidas / trocas”.
    //
    // ✅ Por enquanto:
    // - acompanhantes vem do Fluxo (categoria=acompanhante)
    // - outros vem do Fluxo (categoria=outros)
    // - especulador você pode mapear para “vendasPerdidas” OU “possíveis vendas perdidas” (depende de sua regra)
    // - vendas realizadas vem da tabela Vendas (count) por dia
    // - trocas: se existir em Vendas ou outra tabela, pluga depois

    const fluxoPorDia = initByDow({
      vendasRealizadas: 0,
      acompanhantes: 0,
      vendasPerdidas: 0,
      trocas: 0,
      outros: 0,
    });

    // vendas realizadas: conta registros por auditoria (ou soma campo quantidade, se existir)
    for (const v of vendas) {
      const dt = auditDate.get(v.auditoriaId);
      if (!dt) continue;
      const dia = dayOfWeekLabel(dt);
      fluxoPorDia[dia].vendasRealizadas += 1; // se você tiver v.quantidade, troca por Number(v.quantidade)
    }

    // fluxo (acompanhante/outros/especulador)
    for (const f of fluxos) {
      const dt = auditDate.get(f.auditoriaId);
      if (!dt) continue;
      const dia = dayOfWeekLabel(dt);

      if (f.categoria === "acompanhante")
        fluxoPorDia[dia].acompanhantes += Number(f.quantidade || 0);
      else if (f.categoria === "outros")
        fluxoPorDia[dia].outros += Number(f.quantidade || 0);
      else if (f.categoria === "especulador")
        fluxoPorDia[dia].vendasPerdidas += Number(f.quantidade || 0); // ✅ ajuste a regra se quiser
    }

    // 6) Fluxo por semana (1..6 x dia)
    const fluxoPorSemana = {};
    for (let w = 1; w <= 6; w++) {
      fluxoPorSemana[w] = {};
      for (const dia of DOW) fluxoPorSemana[w][dia] = 0;
    }

    // aqui soma “fluxo total do dia” (vendas+acomp+perdidas+trocas+outros)
    for (const a of auditorias) {
      const dt = new Date(a.data);
      const w = weekOfMonth(dt);
      const dia = dayOfWeekLabel(dt);
      const totalDia = sumObj(fluxoPorDia[dia]);
      fluxoPorSemana[w][dia] += totalDia;
    }

    // 7) Vendas perdidas por dia da semana (motivos)
    // ⚠️ Ajuste nomes conforme o model Perdas
    const perdasPorDia = initByDow({
      preco: 0,
      faltaMercadoria: 0,
      modCorTamanho: 0,
      formaPagamento: 0,
      atendimento: 0,
      outros: 0,
    });

    for (const p of perdas) {
      const dt = auditDate.get(p.auditoriaId);
      if (!dt) continue;
      const dia = dayOfWeekLabel(dt);

      perdasPorDia[dia].preco += Number(p.preco || 0);
      perdasPorDia[dia].faltaMercadoria += Number(p.falta_mercadoria || 0);
      perdasPorDia[dia].modCorTamanho += Number(p.mod_cor_tamanho || 0);
      perdasPorDia[dia].formaPagamento += Number(p.forma_pagamento || 0);
      perdasPorDia[dia].atendimento += Number(p.atendimento || 0);
      perdasPorDia[dia].outros += Number(p.outros || 0);
    }

    // 8) Aproveitamento
    const aproveitamento = {};
    for (const dia of DOW) {
      const fluxoTotalDia = sumObj(fluxoPorDia[dia]);
      const numVendas = Number(fluxoPorDia[dia].vendasRealizadas || 0);
      const perc = fluxoTotalDia > 0 ? (numVendas / fluxoTotalDia) * 100 : 0;
      aproveitamento[dia] = {
        fluxoPessoas: fluxoTotalDia,
        numeroVendas: numVendas,
        aproveitamento: Number(perc.toFixed(2)),
      };
    }

    return {
      lojaId,
      mes,
      ano,
      totalAuditado,
      perfilClientesCompradores: withTotalsByDow(perfil),
      fluxoPessoasPorDiaSemana: withTotalsByDow(fluxoPorDia),

      // ✅ FIX
      fluxoPessoasPorSemana: fluxoPorSemana,

      vendasPerdidasPorDiaSemana: withTotalsByDow(perdasPorDia),
      aproveitamentoVendas: aproveitamento,
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
