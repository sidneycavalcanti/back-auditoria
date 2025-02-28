import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const authController = {
  signIn: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Verificar se o `username` foi enviado
      if (!username || !password) {
        return res.status(400).json({ message: 'Usuário e senha são obrigatórios' });
      }

      // Buscar o usuário no banco de dados
      const user = await Usuario.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Verificar a senha
      const isPasswordValid = await user.checkPassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Senha inválida' });
      }

      // Gerar token JWT
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '12h' });

      // Retornar o token e informações do usuário
      return res.status(200).json({
        message: 'Login realizado com sucesso',
        token,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
        },
      });
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ message: 'Erro interno no servidor', error: error.message });
    }
  },
};

export default authController;
