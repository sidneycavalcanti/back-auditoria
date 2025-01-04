import fluxoService from '../services/fluxoService.js';

class FluxoController {
  // Método para listar fluxopessoas com filtros e paginação
  async index(req, res) {
    try {
      const fluxopessoa = await fluxoService.getFluxopessoa(req.query);
      return res.status(200).json(fluxopessoa);
    } catch (error) {
      console.error('Erro ao buscar fluxopessoas:', error); // Log mais detalhado
      return res.status(500).json({ error: 'Erro ao buscar fluxopessoas', detalhes: error.message });
    }
  }

  // Método para buscar fluxopessoa por ID
  async show(req, res) {
    try {
      const fluxopessoa = await fluxoService.getFluxopessoaById(req.params.id);

      if (!fluxopessoa) {
        return res.status(404).json({ error: 'Fluxopessoa não encontrada' });
      }

      return res.status(200).json(fluxopessoa);
    } catch (error) {
      console.error('Erro ao buscar fluxopessoa:', error); // Log mais detalhado
      return res.status(500).json({ error: 'Erro ao buscar fluxopessoa', detalhes: error.message });
    }
  }

  // Método para criar uma nova fluxopessoa
  async create(req, res) {
    try {
      const fluxopessoa = await fluxoService.createFluxopessoa(req.body);
      return res.status(201).json(fluxopessoa);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao criar fluxopessoa:', error); // Log mais detalhado
      return res.status(500).json({ error: 'Erro ao criar fluxopessoa', detalhes: error.message });
    }
  }

  // Método para atualizar uma fluxopessoa existente
  async update(req, res) {
    try {
      const fluxopessoa = await fluxoService.updateFluxopessoa(req.params.id, req.body);

      return res.status(200).json(fluxopessoa);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao atualizar fluxopessoa:', error); // Log mais detalhado
      return res.status(500).json({ error: 'Erro ao atualizar fluxopessoa', detalhes: error.message });
    }
  }

  // Método para excluir uma fluxopessoa
  async destroy(req, res) {
    try {
      await fluxoService.deleteFluxopessoa(req.params.id);
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir fluxopessoa:', error); // Log mais detalhado
      return res.status(500).json({ error: 'Erro ao excluir fluxopessoa', detalhes: error.message });
    }
  }
}

export default new FluxoController();
