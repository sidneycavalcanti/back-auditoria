import Formadepagamento from '../services/formadepagamentoService.js';
//import { createcatSchema, updatecatSchema } from '../validations/catValidation.js'; // Categoria não precisa de validação

class FormadepagamentoController {
  async index(req, res) {
    try {
      const Formadepagamento = await Formadepagamento.getFormadepagamento(req.query);
      return res.status(200).json(Formadepagamento);
    } catch (error) {
      console.error('Erro ao buscar avaliação operacional:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao buscar avaliação operacional', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
   
  }

  async show(req, res) {
    try {
      const Formadepagamento = await Formadepagamento.getFormadepagamentoById(req.params.id);

      if (!Formadepagamento) {
        return res.status(404).json({ error: 'avaliação operacional não encontrado' });
      }

      return res.status(200).json(Formadepagamento);
    } catch (error) {
      console.error('Erro ao criar avaliação operacional:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar avaliação operacional', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
  }

  async create(req, res) {
    try {
      await req.body, { abortEarly: false }; // aqui ela passa pela validação 

      const Formadepagamento = await Formadepagamento.createFormadepagamento(req.body);

      return res.status(201).json(Formadepagamento);
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

      const Formadepagamento = await Formadepagamento.updateFormadepagamento(req.params.id, req.body);

      return res.status(200).json(Formadepagamento);
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
      await Formadepagamento.deleteFormadepagamento(req.params.id);
      return res.status(204).send();
    } catch (error) {
      //return res.status(500).json({ error: 'Erro ao excluir categoria' });
      console.error('Erro ao excluir avaliação operacional:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao excluir avaliação operacional', detalhes: error.message });
    }
  }
}

export default new FormadepagamentoController();
