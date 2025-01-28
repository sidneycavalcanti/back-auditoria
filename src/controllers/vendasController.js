import VendasService from '../services/vendasService.js';
//import { createcatSchema, updatecatSchema } from '../validations/catValidation.js'; // Categoria não precisa de validação

class VendasController {
  async index(req, res) {
    try {
      const vendas = await VendasService.getVendas(req.query);
      return res.status(200).json(vendas);
    } catch (error) {
      console.error('Erro ao buscar vendas:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao buscar vendas', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
   
  }

  async show(req, res) {
      try {
        const vendas = await VendasService.getVendasById(req.params.id);
  
        if (!vendas) {
          return res.status(404).json({ error: 'Vendas não encontrado' });
        }
  
        return res.status(200).json(vendas);
      } catch (error) {
        return res.status(500).json({ error: 'Erro aaaaao buscar Vendas', detalhes: error.message});
      }
    }

  async create(req, res) {
    try {
      await req.body, { abortEarly: false }; // aqui ela passa pela validação 

      const vendas = await VendasService.createVendas(req.body);

      return res.status(201).json(vendas);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao criar Vendas:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar Vendas', detalhes: error.message });
    }
  }

  async update(req, res) {
    try {
      await req.body, { abortEarly: false };

      const vendas = await VendasService.updateVendas(req.params.id, req.body);

      return res.status(200).json(vendas);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao atualizar vendas:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao atualizar vendas', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
  }

  async destroy(req, res) {
    try {
      await VendasService.deleteVendas(req.params.id);
      return res.status(204).send();
    } catch (error) {
      //return res.status(500).json({ error: 'Erro ao excluir categoria' });
      console.error('Erro ao excluir vendas:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao excluir vendas', detalhes: error.message });
    }
  }
}

export default new VendasController();
