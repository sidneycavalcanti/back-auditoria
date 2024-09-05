import motivoperdasService from '../services/motivoperdasService.js';
//import { createcatSchema, updatecatSchema } from '../validations/catValidation.js'; // Categoria não precisa de validação

class motivoperdasController {
  async index(req, res) {
    try {
      const motivo = await motivoperdasService.getMotivoperdas(req.query);
      return res.status(200).json(motivo);
    } catch (error) {
      console.error('Erro ao buscar motivo de perdas:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao buscar motivo de perdas', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
   
  }

  async show(req, res) {
    try {
      const motivo = await motivoperdasService.getMotivoperdasById(req.params.id);

      if (!motivo) {
        return res.status(404).json({ error: 'motivo de perdas não encontrado' });
      }

      return res.status(200).json(motivo);
    } catch (error) {
      console.error('Erro ao criar motivo de perdas:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar motivo de perdas', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
  }

  async create(req, res) {
    try {
      await req.body, { abortEarly: false }; // aqui ela passa pela validação 

      const motivo = await motivoperdasService.createMotivoperdas(req.body);

      return res.status(201).json(motivo);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao criar motivo de perdas:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar motivo de perdas', detalhes: error.message });
    }
  }

  async update(req, res) {
    try {
      await req.body, { abortEarly: false };

      const motivo = await motivoperdasService.updateMotivoperdas(req.params.id, req.body);

      return res.status(200).json(motivo);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao atualizar motivo de perdas:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao atualizar motivo de perdas', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
  }

  async destroy(req, res) {
    try {
      await motivoperdasService.deleteCadavoperacional(req.params.id);
      return res.status(204).send();
    } catch (error) {
      //return res.status(500).json({ error: 'Erro ao excluir categoria' });
      console.error('Erro ao excluir avaliação operacional:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao excluir avaliação operacional', detalhes: error.message });
    }
  }
}

export default new motivoperdasController();
