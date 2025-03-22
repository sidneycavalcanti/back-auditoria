import UserService from '../services/userService.js';
import { createUserSchema, updateUserSchema } from '../validations/userValidation.js';

class UserController {
  async index(req, res) {
    try {
      const users = await UserService.getUsers(req.query);
      return res.status(200).json(users);
    } catch (error) {
      console.error('Erro ao criar usuário:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao criar usuário', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  }

  async show(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  async create(req, res) {
    try {
      // Validação do payload
      await createUserSchema.validate(req.body, { abortEarly: false });
      
      // Verificação de unicidade no banco de dados
      const userExists = await User.findOne({ where: { username: req.body.username } });
      if (userExists) {
        return res.status(400).json({ error: "Usuário já existente." });
      }
      
      // Criação do usuário
      const user = await UserService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ error: 'Erro ao criar usuário', detalhes: error.message });
    }
  }
  
  async update(req, res) {
    try {
      await updateUserSchema.validate(req.body, { abortEarly: false });

      const user = await UserService.updateUser(req.params.id, req.body);

      return res.status(200).json(user);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao excluir usuário:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao excluir usuário', detalhes: error.message });
      //return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  async destroy(req, res) {
    try {
      await UserService.deleteUser(req.params.id);
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error); // Log mais detalhado
      res.status(500).json({ error: 'Erro ao excluir usuário', detalhes: error.message });
     // return res.status(500).json({ error: 'Erro ao excluir usuário' });
    }
  }
}

export default new UserController();
