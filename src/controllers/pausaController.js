import PausaService from '../services/pausaService.js';
//import { createcatSchema, updatecatSchema } from '../validations/catValidation.js'; // Categoria não precisa de validação

class PausaController {
  async index(req, res) {
    try {
      const pausas  = await PausaService.getPausas(req.query); // ❌ ERRO - Função não existe
      return res.status(200).json(pausas);
    } catch (error) {
      console.error('Erro ao buscar pausa:', error);
      res.status(500).json({ error: 'Erro ao buscar pausa', detalhes: error.message });
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
      const { id } = req.params;
  
      console.log(`📡 Encerrando pausa com ID: ${id}`);
  
      // 🔥 Confirma que o ID é válido
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID inválido para encerrar a pausa" });
      }
  
      // 🔥 Chama o serviço para atualizar a pausa
      const pausaEncerrada = await PausaService.updatePausa(id);
  
      console.log("✅ Pausa encerrada no backend:", pausaEncerrada);
  
      return res.status(200).json({ message: "Pausa encerrada com sucesso", pausa: pausaEncerrada });
    } catch (error) {
      console.error("❌ ERRO ao encerrar pausa:", error.message);
      return res.status(500).json({ error: "Erro ao encerrar pausa", detalhes: error.message });
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

  async encerrarPausa(req, res) {
    try {
      const { id } = req.params;
  
      console.log(`📡 Encerrando pausa com ID: ${id}`);
  
      // 🔥 Chama o serviço e passa explicitamente { status: 0 }
      const pausaEncerrada = await PausaService.updatePausa(id, { status: 0 });
  
      if (!pausaEncerrada) {
        return res.status(404).json({ error: "Pausa não encontrada ou já encerrada" });
      }
  
      console.log("✅ Pausa encerrada no backend:", pausaEncerrada);
  
      return res.status(200).json({ message: "Pausa encerrada com sucesso", pausa: pausaEncerrada });
    } catch (error) {
      console.error("❌ Erro ao encerrar pausa:", error);
      return res.status(500).json({ error: "Erro ao encerrar pausa no servidor", detalhes: error.message });
    }
  }

  async getPausasAtivas(req, res) {
    try {
      const { auditoriaId } = req.params;
  
      if (!auditoriaId) {
        return res.status(400).json({ error: "AuditoriaId é obrigatório" });
      }
  
      const pausasAtivas = await PausaService.getPausasAtivas(auditoriaId);
  
      if (!pausasAtivas.length) {
        return res.status(200).json({ message: "Nenhuma pausa ativa encontrada", pausas: [] });
      }
  
      return res.status(200).json({ pausas: pausasAtivas });
    } catch (error) {
      console.error("❌ Erro ao buscar pausas ativas:", error.message);
      return res.status(500).json({ error: "Erro ao buscar pausas ativas", detalhes: error.message });
    }
  }
  
  
  
}

export default new PausaController();
