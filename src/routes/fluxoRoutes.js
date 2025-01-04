import { Router } from 'express';
import fluxoController from '../controllers/fluxoController.js';

const router = new Router();

router.get('/', fluxoController.index);
router.get('/:id', fluxoController.show);
router.post('/', fluxoController.create);
router.put('/:id', fluxoController.update);
router.delete('/:id', fluxoController.destroy);

export default router;
