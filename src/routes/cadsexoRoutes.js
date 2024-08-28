import { Router } from 'express';
import cadsexoController from '../controllers/cadsexoController.js';

const router = new Router();

router.get('/', cadsexoController.index);
router.get('/:id', cadsexoController.show);
router.post('/', cadsexoController.create);
router.put('/:id', cadsexoController.update);
router.delete('/:id', cadsexoController.destroy);

export default router;
