import { Router } from 'express';
import vendasController from '../controllers/vendasController.js';

const router = new Router();

router.get('/', vendasController.index);
router.get('/:id', vendasController.show);
router.post('/', vendasController.create);
router.put('/:id', vendasController.update);
router.delete('/:id', vendasController.destroy);

export default router;
