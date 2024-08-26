import { Router } from 'express';
import cadavoperacionalController from '../controllers/cadavoperacionalController';

const router = new Router();

router.get('/', cadavoperacionalController.index);
router.get('/:id', cadavoperacionalController.show);
router.post('/', cadavoperacionalController.create);
router.put('/:id', cadavoperacionalController.update);
router.delete('/:id', cadavoperacionalController.destroy);

export default router;
