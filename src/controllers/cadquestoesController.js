import Cadquestoes from '../services/cadquestoesService.js';
//import { createcatSchema, updatecatSchema } from '../validations/catValidation.js'; // Categoria não precisa de validação

class CadquestoesController {
  async index(req, res) {
    try {
      const cats = await Cadquestoes.getCadquestoes(req.query);
      return res.status(200).json(cats);
    } catch (error) {
      console.error('Erro ao buscar questões:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao buscar questões', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
   
  }

  async show(req, res) {
    try {
      const cadq = await Cadquestoes.getcadquestoesById(req.params.id);

      if (!cadq) {
        return res.status(404).json({ error: 'questões não encontrado' });
      }

      return res.status(200).json(cadq);
    } catch (error) {
      console.error('Erro ao criar usuário:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar questões', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
  }

  async create(req, res) {
    try {
      await req.body, { abortEarly: false }; // aqui ela passa pela validação 

      const cadq = await Cadquestoes.createCadquestoes(req.body);

      return res.status(201).json(cadq);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao criar questões:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar questões', detalhes: error.message });
    }
  }

  async update(req, res) {
    try {
      await req.body, { abortEarly: false };

      const cadq = await Cadquestoes.updateCadquestoes(req.params.id, req.body);

      return res.status(200).json(cadq);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao atualizar questões:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao atualizar questões', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
  }

  async destroy(req, res) {
    try {
      await Cadquestoes.deleteCadquestoes(req.params.id);
      return res.status(204).send();
    } catch (error) {
      //return res.status(500).json({ error: 'Erro ao excluir categoria' });
      console.error('Erro ao excluir questões:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao excluir questões', detalhes: error.message });
    }
  }
}

export default new CadquestoesController();
