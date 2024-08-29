import LojaService from '../services/lojaService.js';
//import { createcatSchema, updatecatSchema } from '../validations/catValidation.js'; // Categoria não precisa de validação

class LojaController {
  async index(req, res) {
    try {
      const lojas = await LojaService.getLojaservice(req.query);
      return res.status(200).json(lojas);
    } catch (error) {
      console.error('Erro ao buscar avaliação operacional:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao buscar avaliação operacional', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
   
  }

  async show(req, res) {
    try {
      const loja = await LojaService.getLojaserviceById(req.params.id);

      if (!loja) {
        return res.status(404).json({ error: 'avaliação operacional não encontrado' });
      }

      return res.status(200).json(loja);
    } catch (error) {
      console.error('Erro ao criar Forma de pagamento:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar Forma de pagamento', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
  }

  async create(req, res) {
    try {
      await req.body, { abortEarly: false }; // aqui ela passa pela validação 

      const loja = await LojaService.createLojaservice(req.body);

      return res.status(201).json(loja);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao criar forma de pagamento:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar forma de pagamento', detalhes: error.message });
    }
  }

  async update(req, res) {
    try {
      await req.body, { abortEarly: false };

      const loja = await LojaService.updateLojaservice(req.params.id, req.body);

      return res.status(200).json(loja);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao atualizar forma de pagamento:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao atualizar forma de pagamento', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
  }

  async destroy(req, res) {
    try {
      await LojaService.deleteLojaservice(req.params.id);
      return res.status(204).send();
    } catch (error) {
      //return res.status(500).json({ error: 'Erro ao excluir categoria' });
      console.error('Erro ao excluir avaliação operacional:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao excluir avaliação operacional', detalhes: error.message });
    }
  }
}

export default new LojaController();
