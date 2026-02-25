import RelatorioMensalService from '../services/relatorioMensalService.js';

class RelatorioController {
  async mensal(req, res) {
    try {
      const lojaId = Number(req.query.lojaId);
      const mes = Number(req.query.mes);
      const ano = Number(req.query.ano);

      if (!lojaId || !mes || !ano) {
        return res.status(400).json({ error: "Informe lojaId, mes e ano" });
      }

      const payload = await RelatorioMensalService.gerar({ lojaId, mes, ano });
      return res.status(200).json(payload);
    } catch (error) {
      console.error("❌ Erro relatório mensal:", error);
      return res.status(500).json({ error: "Erro ao gerar relatório mensal", detalhes: error.message });
    }
  }
}

export default new RelatorioController();