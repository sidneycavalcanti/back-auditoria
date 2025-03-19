import CadavoperacionalService from '../services/cadavoperacionalService.js';

class CadavoperacionalController {
  // Listar cadavoperacional (com filtros e paginação)
  async index(req, res) {
    try {
      const {
        page,
        limit,
        descricao,
        situacao,
        createdBefore,
        createdAfter,
        updatedBefore,
        updatedAfter,
        sort
      } = req.query;

      // Converte 'situacao' para boolean caso seja passado
      const filtroSituacao = situacao !== undefined ? (situacao === 'true') : undefined;

      const cadavoperacionais = await CadavoperacionalService.getCadavoperacional({
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

      return res.status(200).json(cadavoperacionais);
    } catch (error) {
      console.error('Erro ao buscar cadavoperacional:', error.message);
      return res.status(500).json({ error: 'Erro ao buscar cadavoperacional.' });
    }
  }

  // Buscar cadavoperacional ativas (ou todas) - antes chamado getPerguntas
  async getAtivos(req, res) {
    try {
      const { situacao } = req.query;
      const filtroSituacao = situacao !== undefined ? (situacao === 'true') : undefined;

      // Se você quiser manter o método no service como getPerguntas, sem problemas.
      // Aqui, apenas renomeamos o método do controller para "getAtivos" como exemplo.
      const cadavoperacionais = await CadavoperacionalService.getPerguntas({
        situacao: filtroSituacao,
      });

      return res.status(200).json({ cadavoperacionais });
    } catch (error) {
      console.error('Erro ao buscar cadavoperacional:', error.message);
      return res.status(500).json({ error: 'Erro ao buscar cadavoperacional.' });
    }
  }

  // Buscar um registro específico por ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const cadavoperacional = await CadavoperacionalService.getCadavoperacionalById(id);

      if (!cadavoperacional) {
        return res.status(404).json({ error: 'cadavoperacional não encontrado.' });
      }

      return res.status(200).json(cadavoperacional);
    } catch (error) {
      console.error('Erro ao buscar cadavoperacional:', error.message);
      return res.status(500).json({ error: 'Erro ao buscar cadavoperacional.' });
    }
  }

  // Criar um novo registro
  async create(req, res) {
    try {
      const novoCadavoperacional = await CadavoperacionalService.createCadavoperacional(req.body);
      return res.status(201).json(novoCadavoperacional);
    } catch (error) {
      console.error('Erro ao criar cadavoperacional:', error.message);
      return res.status(500).json({ error: 'Erro ao criar cadavoperacional.' });
    }
  }

  // Atualizar um registro existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const dadosAtualizados = req.body;

      const cadavoperacionalAtualizado = await CadavoperacionalService.updateCadavoperacional(
        id,
        dadosAtualizados
      );

      return res.status(200).json(cadavoperacionalAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar cadavoperacional:', error.message);
      return res.status(500).json({ error: 'Erro ao atualizar cadavoperacional.' });
    }
  }

  // Deletar um registro
  async destroy(req, res) {
    try {
      const { id } = req.params;
      await CadavoperacionalService.deleteCadavoperacional(id);
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar cadavoperacional:', error.message);
      return res.status(500).json({ error: 'Erro ao deletar cadavoperacional.' });
    }
  }
}

export default new CadavoperacionalController();
