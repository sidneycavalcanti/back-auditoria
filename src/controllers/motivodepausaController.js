import Motivodepausa from '../services/motivodepausaService.js';
//import { createcatSchema, updatecatSchema } from '../validations/catValidation.js'; // Categoria não precisa de validação

class motivodepausaController {
  async index(req, res) {
    try {
      const motivodepausa = await Motivodepausa.getMotivodepausa(req.query);
      return res.status(200).json(motivodepausa);
    } catch (error) {
      console.error('Erro ao buscar avaliação operacional:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao buscar avaliação operacional', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
   
  }

  async show(req, res) {
    try {
      const motivodepausa = await Motivodepausa.getMotivodepausaById(req.params.id);

      if (!motivodepausa) {
        return res.status(404).json({ error: 'avaliação operacional não encontrado' });
      }

      return res.status(200).json(motivodepausa);
    } catch (error) {
      console.error('Erro ao criar avaliação operacional:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar avaliação operacional', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
  }

  async create(req, res) {
    try {
      await req.body, { abortEarly: false }; // aqui ela passa pela validação 

      const motivodepausa = await Motivodepausa.createMotivodepausa(req.body);

      return res.status(201).json(motivodepausa);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao criar avaliação operacional:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar avaliação operacional', detalhes: error.message });
    }
  }

  async update(req, res) {
    try {
      await req.body, { abortEarly: false };

      const motivodepausa = await Motivodepausa.updateMotivodepausa(req.params.id, req.body);

      return res.status(200).json(motivodepausa);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao atualizar avaliação operacional:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao atualizar avaliação operacional', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
  }

  async destroy(req, res) {
    try {
      await Motivodepausa.deleteMotivodepausa(req.params.id);
      return res.status(204).send();
    } catch (error) {
      //return res.status(500).json({ error: 'Erro ao excluir categoria' });
      console.error('Erro ao excluir avaliação operacional:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao excluir avaliação operacional', detalhes: error.message });
    }
  }
}

export default new motivodepausaController();
