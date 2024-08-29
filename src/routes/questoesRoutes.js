import { Router } from 'express';
import questoesController from '../controllers/questoesController';

const router = new Router();

router.get('/', questoesController.index);
router.get('/:id', questoesController.show);
router.post('/', questoesController.create);
router.put('/:id', questoesController.update);
router.delete('/:id', questoesController.destroy);

export default router;
