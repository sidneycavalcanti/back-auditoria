import VendasService from '../services/vendasService.js';

class VendasController {
  async index(req, res) {
    try {
      const { page = 1, limit = 10, auditoriaId, usuarioId, troca, createdBefore, createdAfter, updatedBefore, updatedAfter, sort } = req.query;

      // Converte valores para garantir que sejam números
      const vendas = await VendasService.getVendas({
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10,
        auditoriaId,
        usuarioId,
        troca,
        createdBefore,
        createdAfter,
        updatedBefore,
        updatedAfter,
        sort
      });

      return res.status(200).json(vendas);
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
      res.status(500).json({ error: 'Erro ao buscar vendas', detalhes: error.message });
    }
  }

  async show(req, res) {
    try {
      console.log("ID recebido na requisição:", req.params.id);
  
      const vendas = await VendasService.getVendasById(req.params.id);
  
      if (!vendas) {
        console.log("Nenhuma venda encontrada para o ID:", req.params.id);
        return res.status(404).json({ error: 'Vendas não encontrada' });
      }
  
      return res.status(200).json(vendas);
    } catch (error) {
      console.error("Erro ao buscar vendas:", error);
      return res.status(500).json({ error: 'Erro ao buscar Vendas', detalhes: error.message });
    }
  }

  async create(req, res) {
    try {
      const vendas = await VendasService.createVendas(req.body);
      return res.status(201).json(vendas);
    } catch (error) {
      console.error('Erro ao criar Vendas:', error);
      res.status(500).json({ error: 'Erro ao criar Vendas', detalhes: error.message });
    }
  }

  async update(req, res) {
    try {
      const vendas = await VendasService.updateVendas(req.params.id, req.body);
      return res.status(200).json(vendas);
    } catch (error) {
      console.error('Erro ao atualizar vendas:', error);
      res.status(500).json({ error: 'Erro ao atualizar vendas', detalhes: error.message });
    }
  }

  async destroy(req, res) {
    try {
      await VendasService.deleteVendas(req.params.id);
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir vendas:', error);
      res.status(500).json({ error: 'Erro ao excluir vendas', detalhes: error.message });
    }
  }
}

export default new VendasController();
