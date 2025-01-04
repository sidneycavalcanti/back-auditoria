import { Router } from 'express';
import FluxoController from '../controllers/fluxoController.js';

const router = new Router();

router.get('/', FluxoController.index);
router.get('/:id', FluxoController.show);
router.post('/', FluxoController.create);
router.put('/:id', FluxoController.update);
router.delete('/:id', FluxoController.destroy);

export default router;
