import { Router } from 'express';
import auditoriaController from '../controllers/auditoriaController';

const router = new Router();

router.get('/', auditoriaController.index);
router.get('/:id', auditoriaController.show);
router.post('/', auditoriaController.create);
router.put('/:id', auditoriaController.update);
router.delete('/:id', auditoriaController.destroy);

export default router;
