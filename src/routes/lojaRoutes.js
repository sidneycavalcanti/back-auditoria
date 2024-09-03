import { Router } from 'express';
import lojaController from '../controllers/lojaController.js';

const router = new Router();

router.get('/', lojaController.index);
router.get('/:id', lojaController.show);
router.post('/', lojaController.create);
router.put('/:id', lojaController.update);
router.delete('/:id', lojaController.destroy);

export default router;
