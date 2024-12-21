import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  let token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  // Remover o prefixo "Bearer " se estiver presente
  if (token.startsWith('Bearer ')) {
    token = token.replace('Bearer ', '');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Erro ao validar o token:', err.message);
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};
