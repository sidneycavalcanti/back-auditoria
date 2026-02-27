import { Router } from 'express';
import anotacoesController from '../controllers/anotacoesController.js';

const router = new Router();

/**
 * @swagger
 * tags:
 *   name: Anotação
 *   description: Gerenciamento de anotações
 */

/**
 * @swagger
 * /anotacao:
 *   get:
 *     summary: Lista todas as anotações
 *     tags: [Anotação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de anotações
 */
router.get('/', anotacoesController.index);

/**
 * @swagger
 * /anotacao/{id}:
 *   get:
 *     summary: Busca uma anotação pelo ID
 *     tags: [Anotação]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Anotação encontrada
 *       404:
 *         description: Não encontrada
 */
router.get('/:id', anotacoesController.show);

/**
 * @swagger
 * /anotacao:
 *   post:
 *     summary: Cria uma nova anotação
 *     tags: [Anotação]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Anotação criada
 */
router.post('/', anotacoesController.create);

/**
 * @swagger
 * /anotacao/{id}:
 *   put:
 *     summary: Atualiza uma anotação
 *     tags: [Anotação]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Atualizada com sucesso
 */
router.put('/:id', anotacoesController.update);

/**
 * @swagger
 * /anotacao/{id}:
 *   delete:
 *     summary: Remove uma anotação
 *     tags: [Anotação]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Removida com sucesso
 */
router.delete('/:id', anotacoesController.destroy);

export default router;