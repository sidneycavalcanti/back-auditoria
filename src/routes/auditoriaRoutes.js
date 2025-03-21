import { Router } from 'express';
import auditoriaController from '../controllers/auditoriaController.js';

const router = new Router();

router.get('/', auditoriaController.index);
router.get('/minha', auditoriaController.minhasAuditorias)
router.get('/:id', auditoriaController.show);
router.post('/', auditoriaController.create);
router.put('/:id', auditoriaController.update);
router.delete('/:id', auditoriaController.destroy);

export default router;
