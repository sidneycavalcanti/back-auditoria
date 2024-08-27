import { Router } from 'express';
import cadquestoesController from '../controllers/cadquestoesController';

const router = new Router();

router.get('/', cadquestoesController.index);
router.get('/:id', cadquestoesController.show);
router.post('/', cadquestoesController.create);
router.put('/:id', cadquestoesController.update);
router.delete('/:id', cadquestoesController.destroy);

export default router;
