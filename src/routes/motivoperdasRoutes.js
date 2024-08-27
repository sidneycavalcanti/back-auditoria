import { Router } from 'express';
import motivoperdasController from '../controllers/motivoperdasController';

const router = new Router();

router.get('/', motivoperdasController.index);
router.get('/:id', motivoperdasController.show);
router.post('/', motivoperdasController.create);
router.put('/:id', motivoperdasController.update);
router.delete('/:id', motivoperdasController.destroy);

export default router;
