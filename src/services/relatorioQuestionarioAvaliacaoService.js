import { Op } from "sequelize";
import Auditoria from "../models/Auditoria.js";
import Loja from "../models/Loja.js";
import AvOperacional from "../models/Avoperacional.js";

function getStartEnd(mes, ano) {
  const start = new Date(ano, mes - 1, 1, 0, 0, 0);
  const end = new Date(ano, mes, 1, 0, 0, 0);
  return { start, end };
}

function pickExistingAttrs(Model, attrs) {
  const cols = Object.keys(Model.rawAttributes);
  return attrs.filter((a) => cols.includes(a));
}

const round2 = (n) => Number(Number(n || 0).toFixed(2));

class RelatorioQuestionarioAvaliacaoService {
  async gerar({ lojaId, mes, ano }) {
    const { start, end } = getStartEnd(mes, ano);

    // loja (codigo + nome)
    const loja = await Loja.findByPk(lojaId, { raw: true });
    const lojaCodigo = loja?.codigo ?? loja?.codLoja ?? loja?.id ?? lojaId;
    const lojaNome = loja?.descricao ?? loja?.name ?? loja?.nmLoja ?? "—";

    // auditorias do mês
    const auditorias = await Auditoria.findAll({
      where: {
        lojaId,
        data: { [Op.gte]: start, [Op.lt]: end },
      },
      attributes: pickExistingAttrs(Auditoria, ["id", "data"]),
      raw: true,
    });

    const auditoriaIds = auditorias.map((a) => a.id);
    if (!auditoriaIds.length) {
      return {
        meta: { lojaId, lojaCodigo, lojaNome, mes, ano, auditorias: 0, respostas: 0 },
        categorias: [],
        mediaGeral: 0,
      };
    }

    // respostas do questionário (traz categoria e questão por JOIN)
    // Como no teu retorno já vem "cadavoperacional" e "cadquestoes",
    // assumo que você tem associations definidas no Sequelize.
    const rows = await AvOperacional.findAll({
      where: { auditoriaId: { [Op.in]: auditoriaIds } },
      attributes: pickExistingAttrs(AvOperacional, ["id", "auditoriaId", "nota"]),
      include: [
        {
          association: "cadavoperacional", // ⚠️ tem que existir no model (igual seu retorno)
          attributes: ["id", "descricao"],
          required: true,
        },
        {
          association: "cadquestoes", // ⚠️ tem que existir no model (igual seu retorno)
          attributes: ["id", "name", "situacao"],
          required: true,
        },
      ],
      raw: false,
    });

    // agrupar: categoria -> questao -> { soma, count }
    const catMap = new Map();

    let somaGeral = 0;
    let countGeral = 0;

    for (const r of rows) {
      const nota = Number(r.nota ?? 0);
      const catId = r.cadavoperacional?.id;
      const catNome = r.cadavoperacional?.descricao ?? "—";

      const qId = r.cadquestoes?.id;
      const qNome = r.cadquestoes?.name ?? "—";
      const qAtiva = r.cadquestoes?.situacao !== false; // default true

      // se quiser ignorar questões inativas:
      // if (!qAtiva) continue;

      if (!catMap.has(catId)) {
        catMap.set(catId, {
          categoriaId: catId,
          categoria: catNome,
          questoesMap: new Map(),
          soma: 0,
          count: 0,
        });
      }

      const cat = catMap.get(catId);
      cat.soma += nota;
      cat.count += 1;

      const keyQ = qId;
      if (!cat.questoesMap.has(keyQ)) {
        cat.questoesMap.set(keyQ, {
          questaoId: qId,
          questao: qNome,
          ativa: qAtiva,
          soma: 0,
          count: 0,
        });
      }

      const q = cat.questoesMap.get(keyQ);
      q.soma += nota;
      q.count += 1;

      somaGeral += nota;
      countGeral += 1;
    }

    // montar payload final ordenado
    const categorias = Array.from(catMap.values()).map((c) => {
      const questoes = Array.from(c.questoesMap.values()).map((q) => ({
        questaoId: q.questaoId,
        questao: q.questao,
        ativa: q.ativa,
        media: q.count > 0 ? round2(q.soma / q.count) : 0,
        respostas: q.count,
      }));

      // ordena por nome (ou id)
      questoes.sort((a, b) => String(a.questao).localeCompare(String(b.questao)));

      return {
        categoriaId: c.categoriaId,
        categoria: c.categoria,
        mediaGeral: c.count > 0 ? round2(c.soma / c.count) : 0,
        respostas: c.count,
        questoes,
      };
    });

    // ordena categorias por nome
    categorias.sort((a, b) => String(a.categoria).localeCompare(String(b.categoria)));

    const mediaGeral = countGeral > 0 ? round2(somaGeral / countGeral) : 0;

    return {
      meta: {
        lojaId,
        lojaCodigo,
        lojaNome,
        mes,
        ano,
        auditorias: auditorias.length,
        respostas: rows.length,
      },
      categorias,
      mediaGeral,
    };
  }
}

export default new RelatorioQuestionarioAvaliacaoService();