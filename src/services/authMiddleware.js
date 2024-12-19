import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  // Pegar o token do cabeçalho Authorization
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    // Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Armazena os dados do usuário decodificado no objeto req
    next(); // Continua para a próxima etapa
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};
