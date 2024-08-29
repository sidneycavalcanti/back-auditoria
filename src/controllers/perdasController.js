import PerdasService from '../services/perdasService.js';
import { createPerdasSchema, updatePerdasSchema } from '../validations/PerdasValidation.js';

class PerdasController {
  async index(req, res) {
    try {
      const perdas = await PerdasService.getPerdas(req.query);
      return res.status(200).json(perdas);
    } catch (error) {
      console.error('Erro ao criar perdas:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar perdas', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar perdass' });
    }
  }

  async show(req, res) {
    try {
      const perdas = await PerdasService.getPerdasById(req.params.id);

      if (!perdas) {
        return res.status(404).json({ error: 'perdas não encontrado' });
      }

      return res.status(200).json(perdas);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar perdas' });
    }
  }

  async create(req, res) {
    try {
      await req.body, { abortEarly: false }; // aqui ela passa pela validação 

      const vendas = await PerdasService.createPerdas(req.body);

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
      await updatePerdasSchema.validate(req.body, { abortEarly: false });

      const Perdas = await PerdasService.updatePerdas(req.params.id, req.body);

      return res.status(200).json(Perdas);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao excluir perdas:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao excluir perdas', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao atualizar perdas' });
    }
  }

  async destroy(req, res) {
    try {
      await PerdasService.deletePerdas(req.params.id);
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir perdas:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao excluir perdas', detalhes: error.message });
     // return res.status(500).json({ error: 'Erro ao excluir perdas' });
    }
  }
}

export default new PerdasController();
