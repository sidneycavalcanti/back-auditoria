import { Router } from 'express';
import pausaController from '../controllers/pausaController.js';

const router = new Router();

router.get('/', pausaController.index);
router.get('/:id', pausaController.show);
router.post('/', pausaController.create);
router.put('/:id', pausaController.update);
router.delete('/:id', pausaController.destroy);

// 🚀 Nova Rota para Buscar Somente as Pausas Ativas
router.get('/ativas/:auditoriaId', pausaController.getPausasAtivas);

export default router;
