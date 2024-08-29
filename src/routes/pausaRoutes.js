import { Router } from 'express';
import pausaController from '../controllers/pausaController';

const router = new Router();

router.get('/', pausaController.index);
router.get('/:id', pausaController.show);
router.post('/', pausaController.create);
router.put('/:id', pausaController.update);
router.delete('/:id', pausaController.destroy);

export default router;
