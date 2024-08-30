import QuestoesService from '../services/questoesService';
//import { createcatSchema, updatecatSchema } from '../validations/catValidation.js'; // Categoria não precisa de validação

class QuestoesController {
  async index(req, res) {
    try {
      const questoes = await QuestoesService.getQuestoes(req.query);
      return res.status(200).json(questoes);
    } catch (error) {
      console.error('Erro ao buscar questoes:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao buscar questoes', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
   
  }

  async show(req, res) {
    try {
      const questoes = await QuestoesService.getQuestoesById(req.params.id);

      if (!questoes) {
        return res.status(404).json({ error: 'questoes não encontrado' });
      }

      return res.status(200).json(Questoes);
    } catch (error) {
      console.error('Erro ao criar questoes:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar questoes', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
  }

  async create(req, res) {
    try {
      await req.body, { abortEarly: false }; // aqui ela passa pela validação 

      const questoes = await QuestoesService.createQuestoes(req.body);

      return res.status(201).json(questoes);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao criar questoes:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar questoes', detalhes: error.message });
    }
  }

  async update(req, res) {
    try {
      await req.body, { abortEarly: false };

      const questoes = await QuestoesService.updateQuestoes(req.params.id, req.body);

      return res.status(200).json(questoes);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao atualizar questoes:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao atualizar questoes', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
  }

  async destroy(req, res) {
    try {
      await QuestoesService.deleteQuestoes(req.params.id);
      return res.status(204).send();
    } catch (error) {
      //return res.status(500).json({ error: 'Erro ao excluir categoria' });
      console.error('Erro ao excluir questoes:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao excluir questoes', detalhes: error.message });
    }
  }
}

export default new QuestoesController();
