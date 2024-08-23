import { Router } from 'express';
import usuarioRoutes from './usuarioRoutes.js';
import categoriaRoutes from './categoriaRoutes.js';

const router = Router();

// Registrar as rotas de usuário e categoria
router.use('/usuarios', usuarioRoutes);
router.use('/categorias', categoriaRoutes);

export default router;
