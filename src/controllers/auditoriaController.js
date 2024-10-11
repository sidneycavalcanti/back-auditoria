import AuditoriaService from '../services/AuditoriaService.js';
//import { createcatSchema, updatecatSchema } from '../validations/catValidation.js'; // Categoria não precisa de validação

class AuditoriaController {
  async index(req, res) {
    try {
      const auditoria = await AuditoriaService.getAuditoria(req.query);
      return res.status(200).json(auditoria);
    } catch (error) {
      console.error('Erro ao buscar auditoria:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao buscar auditoria', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
   
  }

  async show(req, res) {
    try {
      const auditoria = await AuditoriaService.getAuditoriaById(req.params.id);

      if (!auditoria) {
        return res.status(404).json({ error: 'auditoria não encontrado' });
      }

      return res.status(200).json(auditoria);
    } catch (error) {
      console.error('Erro ao criar auditoria:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar auditoria', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
  }

  async create(req, res) {
    try {
      await req.body, { abortEarly: false }; // aqui ela passa pela validação 

      const auditoria = await AuditoriaService.createAuditoria(req.body);

      return res.status(201).json(auditoria);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao criar auditoria:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar auditoria', detalhes: error.message });
    }
  }

  async update(req, res) {
    try {
      await req.body, { abortEarly: false };

      const Auditoria = await AuditoriaService.updateAuditoria(req.params.id, req.body);

      return res.status(200).json(Auditoria);
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
      await AuditoriaService.deleteAuditoria(req.params.id);
      return res.status(204).send();
    } catch (error) {
      //return res.status(500).json({ error: 'Erro ao excluir categoria' });
      console.error('Erro ao excluir auditoria:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao excluir auditoria', detalhes: error.message });
    }
  }
}

export default new AuditoriaController();