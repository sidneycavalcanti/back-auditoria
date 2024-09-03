import { Router } from 'express';
import anotacoesController from '../controllers/anotacoesController.js';

const router = new Router();

router.get('/', anotacoesController.index);
router.get('/:id', anotacoesController.show);
router.post('/', anotacoesController.create);
router.put('/:id', anotacoesController.update);
router.delete('/:id', anotacoesController.destroy);

export default router;
