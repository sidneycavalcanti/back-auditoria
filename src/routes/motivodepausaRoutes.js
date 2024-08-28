import { Router } from 'express';
import motivodepausaController from '../controllers/motivodepausaController';

const router = new Router();

router.get('/', motivodepausaController.index);
router.get('/:id', motivodepausaController.show);
router.post('/', motivodepausaController.create);
router.put('/:id', motivodepausaController.update);
router.delete('/:id', motivodepausaController.destroy);

export default router;
