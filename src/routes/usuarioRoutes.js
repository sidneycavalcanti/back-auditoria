import { Router } from 'express';
import usuarioController from '../controllers/usuarioController.js';

const router = new Router();

router.get('/', usuarioController.index);
router.get('/:id', usuarioController.show);
router.post('/', usuarioController.create);
router.put('/:id', usuarioController.update);
router.delete('/:id', usuarioController.destroy);

export default router;
