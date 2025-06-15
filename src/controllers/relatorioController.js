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
    console.log('🔍 auditoriaId recebido:', auditoriaId);

    const auditoria = await AuditoriaService.getAuditoriaById(auditoriaId);
    if (!auditoria) {
      return res.status(404).json({ error: 'Auditoria não encontrada.' });
    }

    return res.json({ auditoria });
  } catch (error) {
    console.error('❌ Erro ao buscar auditoria:', error);
    return res.status(500).json({ error: 'Erro ao gerar relatório', details: error.message });
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
