import AvoperacionalService from '../services/avoperacionalService';
//import { createcatSchema, updatecatSchema } from '../validations/catValidation.js'; // Categoria não precisa de validação

class AvoperacionalController {
  async index(req, res) {
    try {
      const avoperacional = await AvoperacionalService.getAvoperacional(req.query);
      return res.status(200).json(avoperacional);
    } catch (error) {
      console.error('Erro ao buscar avoperacional:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao buscar avoperacional', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
   
  }

  async show(req, res) {
    try {
      const avoperacional = await AvoperacionalService.getAvoperacionalById(req.params.id);

      if (!avoperacional) {
        return res.status(404).json({ error: 'avoperacional não encontrado' });
      }

      return res.status(200).json(avoperacional);
    } catch (error) {
      console.error('Erro ao criar avoperacional:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar avoperacional', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
  }

  async create(req, res) {
    try {
      await req.body, { abortEarly: false }; // aqui ela passa pela validação 

      const avoperacional = await AvoperacionalService.createAvoperacional(req.body);

      return res.status(201).json(avoperacional);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao criar avoperacional:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar avoperacional', detalhes: error.message });
    }
  }

  async update(req, res) {
    try {
      await req.body, { abortEarly: false };

      const avoperacional = await AvoperacionalService.updateAvoperacional(req.params.id, req.body);

      return res.status(200).json(avoperacional);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao atualizar avoperacional:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao atualizar avoperacional', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
  }

  async destroy(req, res) {
    try {
      await AvoperacionalService.deleteAvoperacional(req.params.id);
      return res.status(204).send();
    } catch (error) {
      //return res.status(500).json({ error: 'Erro ao excluir categoria' });
      console.error('Erro ao excluir avoperacional:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao excluir avoperacional', detalhes: error.message });
    }
  }
}

export default new AvoperacionalController();
