import { Router } from 'express';
import perdasController from '../controllers/perdasController';

const router = new Router();

router.get('/', perdasController.index);
router.get('/:id', perdasController.show);
router.post('/', perdasController.create);
router.put('/:id', perdasController.update);
router.delete('/:id', perdasController.destroy);

export default router;
