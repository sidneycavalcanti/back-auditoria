import { Op } from "sequelize";
import Auditoria from "../models/Auditoria.js";
import Perdas from "../models/Perdas.js";
import Loja from "../models/Loja.js";

function getStartEnd(mes, ano) {
  const start = new Date(ano, mes - 1, 1, 0, 0, 0);
  const end = new Date(ano, mes, 1, 0, 0, 0);
  return { start, end };
}

function formatDateBR(d) {
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return null;
  const dd = String(dt.getDate()).padStart(2, "0");
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const yy = String(dt.getFullYear());
  return `${dd}/${mm}/${yy}`;
}

// evita quebrar se a coluna não existir
function pickExistingAttrs(Model, attrs) {
  const cols = Object.keys(Model.rawAttributes);
  return attrs.filter((a) => cols.includes(a));
}

class RelatorioVendasPerdidasDetalhadoService {
  async gerar({ lojaId, mes, ano }) {
    const { start, end } = getStartEnd(mes, ano);

    // 1) dados da loja (código + nome)
    const loja = await Loja.findByPk(lojaId, { raw: true });
    const lojaCodigo = loja?.codigo ?? loja?.codLoja ?? loja?.id ?? lojaId;
    const lojaNome = loja?.descricao ?? loja?.name ?? loja?.nmLoja ?? "—";

    // 2) auditorias do mês
    const auditorias = await Auditoria.findAll({
      where: {
        lojaId,
        data: { [Op.gte]: start, [Op.lt]: end },
      },
      attributes: pickExistingAttrs(Auditoria, ["id", "data"]),
      order: [["data", "ASC"]],
      raw: true,
    });

    const auditoriaIds = auditorias.map((a) => a.id);
    const auditDate = new Map(auditorias.map((a) => [a.id, a.data]));

    if (!auditoriaIds.length) {
      return {
        meta: { lojaId, lojaCodigo, lojaNome, mes, ano, auditorias: 0, perdas: 0 },
        itens: [],
      };
    }

    // 3) perdas detalhadas
    // Ajuste os campos conforme seu model Perdas (eu deixei "tolerante")
    const perdas = await Perdas.findAll({
      where: { auditoriaId: { [Op.in]: auditoriaIds } },
      attributes: pickExistingAttrs(Perdas, [
        "id",
        "auditoriaId",
        "motivo",
        "motivoId",
        "descricao",
        "causa",
        "observacao",
        "obs",
        "quantidade",
        "qtd",
        "createdAt",
      ]),
      order: [["auditoriaId", "ASC"]],
      raw: true,
    });

    const itens = perdas.map((p) => {
      const dataRef = auditDate.get(p.auditoriaId) ?? p.createdAt;
      const data = formatDateBR(dataRef);

      const quantidade = Number(p.quantidade ?? p.qtd ?? 1);

      const causa = String(
        p.motivo ??
          p.causa ??
          p.descricao ??
          p.motivoId ??
          "—"
      );

      const observacao = String(p.observacao ?? p.obs ?? "");

      return { data, quantidade, causa, observacao };
    });

    return {
      meta: {
        lojaId,
        lojaCodigo,
        lojaNome,
        mes,
        ano,
        auditorias: auditorias.length,
        perdas: itens.length,
      },
      itens,
    };
  }
}

export default new RelatorioVendasPerdidasDetalhadoService();