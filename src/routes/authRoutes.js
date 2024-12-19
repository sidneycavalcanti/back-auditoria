import { Router } from 'express';
import authController from '../controllers/authController.js';

const router = Router();

// Rotas de autenticação
//router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);

export default router;
