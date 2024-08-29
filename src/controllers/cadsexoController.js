import CadsexoService from '../services/cadsexoService.js';
//import { createcatSchema, updatecatSchema } from '../validations/catValidation.js'; // Categoria não precisa de validação

class CadsexoController {
  async index(req, res) {
    try {
      const cadsexo = await Cadsexo.CadsexoService(req.query);
      return res.status(200).json(cats);
    } catch (error) {
      console.error('Erro ao buscar sexo:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao buscar sexo', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
   
  }

  async show(req, res) {
    try {
      const cadsexo = await CadsexoService.getCadsexoById(req.params.id);

      if (!cadsexo) {
        return res.status(404).json({ error: 'sexo não encontrado' });
      }

      return res.status(200).json(cadsexo);
    } catch (error) {
      console.error('Erro ao criar sexo:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar sexo', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
  }

  async create(req, res) {
    try {
      await req.body, { abortEarly: false }; // aqui ela passa pela validação 

      const cadsexo = await CadsexoService.createCadsexo(req.body);

      return res.status(201).json(cadsexo);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao criar sexo:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar sexo', detalhes: error.message });
    }
  }

  async update(req, res) {
    try {
      await req.body, { abortEarly: false };

      const cadsexo = await CadsexoService.updateCadsexo(req.params.id, req.body);

      return res.status(200).json(cadsexo);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao atualizar sexo:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao atualizar sexo', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
  }

  async destroy(req, res) {
    try {
      await CadsexoService.deleteCadsexo(req.params.id);
      return res.status(204).send();
    } catch (error) {
      //return res.status(500).json({ error: 'Erro ao excluir categoria' });
      console.error('Erro ao excluir sexo:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao excluir sexo', detalhes: error.message });
    }
  }
}

export default new CadsexoController();
