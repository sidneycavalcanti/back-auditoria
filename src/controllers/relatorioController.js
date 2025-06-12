// RelatorioController.js
import AuditoriaService from '../services/AuditoriaService.js';
import VendasService from '../services/vendasService.js';
import FluxoService from '../services/fluxoService.js';
import PausaService from '../services/pausaService.js';
import PerdaService from '../services/perdasService.js';
import AnotacoesService from '../services/anotacoesService.js';
import AvoperacionalService from '../services/avoperacionalService.js';

class RelatorioController {
  async gerarRelatorio(req, res) {
    const { auditoriaId } = req.params;

    try {
      const auditoria = await AuditoriaService.getAuditoriaById(auditoriaId);
      const vendas = await VendasService.getVendas({ auditoriaId, limit: 100 });
      const fluxo = await FluxoService.getFluxopessoa({ auditoriaId, limit: 100 });
      const pausas = await PausaService.getPausas({ auditoriaId, limit: 100 });
      const perdas = await PerdaService.getPerdas({ auditoriaId, limit: 100 });
      const anotacoes = await AnotacoesService.getAnotacoes({ auditoriaId, limit: 100 });
      const avaliacoes = await AvoperacionalService.getAvoperacional({ auditoriaId, limit: 100 });

      return res.json({
        auditoria,
        vendas,
        fluxo,
        pausas,
        perdas,
        anotacoes,
        avaliacoes
      });
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      return res.status(500).json({ error: 'Erro ao gerar relatório' });
    }
  }
  async index(req, res) {
    try {
      // Pegue seus filtros da query string
      const { dataInicial, dataFinal, lojaId, usuarioId } = req.query;

      // Monte filtros para passar ao Service (ajuste conforme seu relatório)
      const filtros = {};
      if (lojaId) filtros.lojaId = lojaId;
      if (usuarioId) filtros.usuarioId = usuarioId;
      if (dataInicial || dataFinal) filtros.data = {};
      if (dataInicial) filtros.data[">="] = dataInicial;
      if (dataFinal) filtros.data["<="] = dataFinal;

      // Chame seu service de auditoria, pode criar um método novo para relatório
      const resultado = await AuditoriaService.getAuditoriaRelatorio(filtros);

      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao gerar relatório', detalhes: error.message });
    }
  }
}

export default new RelatorioController();
