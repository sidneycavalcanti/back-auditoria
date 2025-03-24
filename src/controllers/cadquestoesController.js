import CadquestoesService from '../services/cadquestoesService.js';
// import { createQuestoesSchema, updateQuestoesSchema } from '../validations/questoesValidation.js';
// ^ Se você usar alguma biblioteca de validação, importe e aplique aqui.

class CadquestoesController {
 // Listagem com filtros, paginação e cadavoperacionalId
 async index(req, res) {
  try {
    // Aqui você pode ler cadavoperacionalId, page, etc. de req.query
    const questoes = await CadquestoesService.getCadquestoes(req.query);
    return res.status(200).json(questoes);
  } catch (error) {
    console.error('Erro ao buscar questões:', error);
    return res.status(500).json({
      error: 'Erro ao buscar questões',
      detalhes: error.message
    });
  }
}
    // Mostra uma questão específica
    async show(req, res) {
      try {
        const questao = await CadquestoesService.getCadquestoesById(req.params.id);
  
        if (!questao) {
          return res.status(404).json({ error: 'Questão não encontrada' });
        }
  
        return res.status(200).json(questao);
      } catch (error) {
        console.error('Erro ao buscar questão:', error);
        return res.status(500).json({
          error: 'Erro ao buscar questão',
          detalhes: error.message
        });
      }
    }
    
  // Cria uma nova questão
  async create(req, res) {
    try {
      // Exemplo: se usar Yup/Joi, faça algo assim:
      // const validatedData = await createQuestoesSchema.validate(req.body, { abortEarly: false });

      const questaoCriada = await CadquestoesService.createCadquestoes(req.body);
      return res.status(201).json(questaoCriada);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao criar questão:', error);
      return res.status(500).json({
        error: 'Erro ao criar questão',
        detalhes: error.message
      });
    }
  }

  // Atualiza uma questão existente
  async update(req, res) {
    try {
      // Se usar validação, faça aqui também:
      // const validatedData = await updateQuestoesSchema.validate(req.body, { abortEarly: false });

      const questaoAtualizada = await CadquestoesService.updateCadquestoes(req.params.id, req.body);
      return res.status(200).json(questaoAtualizada);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao atualizar questão:', error);
      return res.status(500).json({
        error: 'Erro ao atualizar questão',
        detalhes: error.message
      });
    }
  }

  // Exclui uma questão
  async destroy(req, res) {
    try {
      await CadquestoesService.deleteCadquestoes(req.params.id);
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir questão:', error);
      return res.status(500).json({
        error: 'Erro ao excluir questão',
        detalhes: error.message
      });
    }
  }
}

export default new CadquestoesController();
