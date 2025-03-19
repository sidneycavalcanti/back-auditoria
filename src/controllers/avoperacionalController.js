import AvoperacionalService from '../services/avoperacionalService.js';
// import { createAvoperacionalSchema, updateAvoperacionalSchema } from '../validations/avoperacionalValidation.js';
// (Exemplo de import de validações, se você usar alguma biblioteca)

class AvoperacionalController {
  // Lista com paginação e filtros
  async index(req, res) {
    try {
      const avoperacional = await AvoperacionalService.getAvoperacional(req.query);
      return res.status(200).json(avoperacional);
    } catch (error) {
      console.error('Erro ao buscar avoperacional:', error);
      return res.status(500).json({
        error: 'Erro ao buscar avoperacional',
        detalhes: error.message
      });
    }
  }

  // Mostra um registro específico por ID
  async show(req, res) {
    try {
      const avoperacional = await AvoperacionalService.getAvoperacionalById(req.params.id);

      if (!avoperacional) {
        return res.status(404).json({ error: 'avoperacional não encontrado' });
      }

      return res.status(200).json(avoperacional);
    } catch (error) {
      console.error('Erro ao buscar avoperacional:', error);
      return res.status(500).json({
        error: 'Erro ao buscar avoperacional',
        detalhes: error.message
      });
    }
  }

  // Cria um novo registro
  async create(req, res) {
    try {
      // Exemplo: se você tiver validação com Yup/Joi, use-a aqui:
      // const validatedData = await createAvoperacionalSchema.validate(req.body, { abortEarly: false });

      const avoperacional = await AvoperacionalService.createAvoperacional(req.body);
      return res.status(201).json(avoperacional);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao criar avoperacional:', error);
      return res.status(500).json({
        error: 'Erro ao criar avoperacional',
        detalhes: error.message
      });
    }
  }

  // Atualiza um registro existente
  async update(req, res) {
    try {
      // Exemplo: se você tiver validação com Yup/Joi, use-a aqui:
      // const validatedData = await updateAvoperacionalSchema.validate(req.body, { abortEarly: false });

      const avoperacional = await AvoperacionalService.updateAvoperacional(req.params.id, req.body);
      return res.status(200).json(avoperacional);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao atualizar avoperacional:', error);
      return res.status(500).json({
        error: 'Erro ao atualizar avoperacional',
        detalhes: error.message
      });
    }
  }

  // Deleta um registro
  async destroy(req, res) {
    try {
      await AvoperacionalService.deleteAvoperacional(req.params.id);
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir avoperacional:', error);
      return res.status(500).json({
        error: 'Erro ao excluir avoperacional',
        detalhes: error.message
      });
    }
  }
}

export default new AvoperacionalController();
