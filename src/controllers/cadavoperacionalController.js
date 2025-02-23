import CadavoperacionalService from '../services/cadavoperacionalService.js';

class CadavoperacionalController {
  // 🔥 Listar perguntas (ativas ou todas)
  async index(req, res) {
    try {
      const { page, limit, descricao, situacao, createdBefore, createdAfter, updatedBefore, updatedAfter, sort } = req.query;

      // 🔥 Se `situacao` for passado na URL, converte para booleano corretamente
      const filtroSituacao = situacao !== undefined ? (situacao === 'true') : undefined;

      const perguntas = await CadavoperacionalService.getCadavoperacional({
        page,
        limit,
        descricao,
        situacao: filtroSituacao,
        createdBefore,
        createdAfter,
        updatedBefore,
        updatedAfter,
        sort,
      });

      return res.status(200).json(perguntas);
    } catch (error) {
      console.error('❌ Erro ao buscar perguntas:', error.message);
      return res.status(500).json({ error: 'Erro ao buscar perguntas.' });
    }
  }

  // 🔥 Buscar perguntas ativas (ou todas)
  async getPerguntas(req, res) {
    try {
      const { situacao } = req.query;

      // 🔥 Converte `situacao` para booleano caso seja passado
      const filtroSituacao = situacao !== undefined ? (situacao === 'true') : undefined;

      const perguntas = await CadavoperacionalService.getPerguntas({ situacao: filtroSituacao });

      return res.status(200).json({ perguntas });
    } catch (error) {
      console.error('❌ Erro ao buscar perguntas:', error.message);
      return res.status(500).json({ error: 'Erro ao buscar perguntas.' });
    }
  }

  // 🔥 Buscar uma pergunta específica por ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const pergunta = await CadavoperacionalService.getCadavoperacionalById(id);

      if (!pergunta) {
        return res.status(404).json({ error: 'Pergunta não encontrada.' });
      }

      return res.status(200).json(pergunta);
    } catch (error) {
      console.error('❌ Erro ao buscar pergunta:', error.message);
      return res.status(500).json({ error: 'Erro ao buscar pergunta.' });
    }
  }

  // 🔥 Criar uma nova pergunta
  async create(req, res) {
    try {
      const novaPergunta = await CadavoperacionalService.createCadavoperacional(req.body);
      return res.status(201).json(novaPergunta);
    } catch (error) {
      console.error('❌ Erro ao criar pergunta:', error.message);
      return res.status(500).json({ error: 'Erro ao criar pergunta.' });
    }
  }

  // 🔥 Atualizar uma pergunta existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const dadosAtualizados = req.body;

      const perguntaAtualizada = await CadavoperacionalService.updateCadavoperacional(id, dadosAtualizados);

      return res.status(200).json(perguntaAtualizada);
    } catch (error) {
      console.error('❌ Erro ao atualizar pergunta:', error.message);
      return res.status(500).json({ error: 'Erro ao atualizar pergunta.' });
    }
  }

  // 🔥 Deletar uma pergunta
  async destroy(req, res) {
    try {
      const { id } = req.params;
      await CadavoperacionalService.deleteCadavoperacional(id);
      return res.status(204).send();
    } catch (error) {
      console.error('❌ Erro ao deletar pergunta:', error.message);
      return res.status(500).json({ error: 'Erro ao deletar pergunta.' });
    }
  }
}

export default new CadavoperacionalController();
