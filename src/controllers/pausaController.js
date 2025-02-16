import PausaService from '../services/pausaService.js';
//import { createcatSchema, updatecatSchema } from '../validations/catValidation.js'; // Categoria não precisa de validação

class PausaController {
  async index(req, res) {
    try {
      const pausas = await PausaService.getPausas(req.query); // ✅ CORRETO - Função existente
      return res.status(200).json(pausas);
    } catch (error) {
      console.error('Erro ao buscar pausas:', error);
      res.status(500).json({ error: 'Erro ao buscar pausas', detalhes: error.message });
    }
  }
  

  async show(req, res) {
    try {
      const pausa = await PausaService.getPausaById(req.params.id);

      if (!pausa) {
        return res.status(404).json({ error: 'Pausa não encontrado' });
      }

      return res.status(200).json(pausa);
    } catch (error) {
      console.error('Erro ao criar pausa:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar pausa', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
  }

  async create(req, res) {
    try {
      await req.body, { abortEarly: false }; // aqui ela passa pela validação 

      const pausa = await PausaService.createPausa(req.body);

      return res.status(201).json(pausa);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao criar pausa:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar pausa', detalhes: error.message });
    }
  }

  async update(req, res) {
    try {
      await req.body, { abortEarly: false };

      const pausa = await PausaService.updatePausa(req.params.id, req.body);

      return res.status(200).json(pausa);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao atualizar pausa:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao atualizar pausa', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
  }

  async destroy(req, res) {
    try {
      await PausaService.deletePausa(req.params.id);
      return res.status(204).send();
    } catch (error) {
      //return res.status(500).json({ error: 'Erro ao excluir categoria' });
      console.error('Erro ao excluir pausa:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao excluir pausa', detalhes: error.message });
    }
  }
}

export default new PausaController();
