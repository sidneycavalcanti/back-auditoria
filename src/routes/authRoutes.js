import { Router } from 'express';
import authController from '../controllers/authController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints para login/registro
 */

// Rotas de autenticação
//router.post('/signup', authController.signUp);
/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Realiza login de usuário
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Token JWT retornado
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/signin', authController.signIn);

export default router;
