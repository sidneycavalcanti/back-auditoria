import CatService from '../services/catService.js';
//import { createcatSchema, updatecatSchema } from '../validations/catValidation.js'; // Categoria não precisa de validação

class CatController {
  async index(req, res) {
    try {
      const cats = await CatService.getCats(req.query);
      return res.status(200).json(cats);
    } catch (error) {
      console.error('Erro ao buscar categoria:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao buscar categoria', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
   
  }

  async show(req, res) {
    try {
      const cat = await CatService.getCatById(req.params.id);

      if (!cat) {
        return res.status(404).json({ error: 'Categoria não encontrado' });
      }

      return res.status(200).json(cat);
    } catch (error) {
      console.error('Erro ao criar usuário:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar categoria', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
  }

  async create(req, res) {
    try {
      await req.body, { abortEarly: false }; // aqui ela passa pela validação 

      const cat = await CatService.createCat(req.body);

      return res.status(201).json(cat);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao criar usuário:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar categoria', detalhes: error.message });
    }
  }

  async update(req, res) {
    try {
      await req.body, { abortEarly: false };

      const cat = await CatService.updateCat(req.params.id, req.body);

      return res.status(200).json(cat);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao atualizar categoria:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao atualizar categoria', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
  }

  async destroy(req, res) {
    try {
      await CatService.deletecat(req.params.id);
      return res.status(204).send();
    } catch (error) {
      //return res.status(500).json({ error: 'Erro ao excluir categoria' });
      console.error('Erro ao excluir categoria:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao excluir categoria', detalhes: error.message });
    }
  }
}

export default new CatController();