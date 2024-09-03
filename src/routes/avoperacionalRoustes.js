import { Router } from 'express';
import avoperacionalController from '../controllers/avoperacionalController.js';

const router = new Router();

router.get('/', avoperacionalController.index);
router.get('/:id', avoperacionalController.show);
router.post('/', avoperacionalController.create);
router.put('/:id', avoperacionalController.update);
router.delete('/:id', avoperacionalController.destroy);

export default router;
