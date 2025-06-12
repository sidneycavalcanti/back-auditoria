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

}

export default new RelatorioController();
