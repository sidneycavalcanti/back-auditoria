import { Router } from 'express';
import categoriaController from '../controllers/categoriaController.js';

const router = new Router();

router.get('/', categoriaController.index);
router.get('/:id', categoriaController.show);
router.post('/', categoriaController.create);
router.put('/:id', categoriaController.update);
router.delete('/:id', categoriaController.destroy);

export default router;
