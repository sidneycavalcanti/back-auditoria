import AnotacoesService from '../services/anotacoesService';
//import { createcatSchema, updatecatSchema } from '../validations/catValidation.js'; // Categoria não precisa de validação

class AnotacoesController {
  async index(req, res) {
    try {
      const anotacoes = await AnotacoesService.getAnotacoes(req.query);
      return res.status(200).json(anotacoes);
    } catch (error) {
      console.error('Erro ao buscar anotacões:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao buscar anotacões', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
   
  }

  async show(req, res) {
    try {
      const anotacoes = await AnotacoesService.getAnotacoesById(req.params.id);

      if (!anotacoes) {
        return res.status(404).json({ error: 'Anotações não encontrado' });
      }

      return res.status(200).json(anotacoes);
    } catch (error) {
      console.error('Erro ao criar anotações:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar anotacões', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
  }

  async create(req, res) {
    try {
      await req.body, { abortEarly: false }; // aqui ela passa pela validação 

      const anotacoes = await AnotacoesService.createAnotacoes(req.body);

      return res.status(201).json(anotacoes);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao criar anotações:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar anotações', detalhes: error.message });
    }
  }

  async update(req, res) {
    try {
      await req.body, { abortEarly: false };

      const anotacoes = await AnotacoesService.updateAnotacoes(req.params.id, req.body);

      return res.status(200).json(anotacoes);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao atualizar anotacões:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao atualizar anotações', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
  }

  async destroy(req, res) {
    try {
      await AnotacoesService.deleteAnotacoes(req.params.id);
      return res.status(204).send();
    } catch (error) {
      //return res.status(500).json({ error: 'Erro ao excluir categoria' });
      console.error('Erro ao excluir anotacões:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao excluir anotações', detalhes: error.message });
    }
  }
}

export default new AnotacoesController();
