import { Router } from 'express';
import vendasController from '../controllers/vendasController.js';

const router = new Router();

/* Relatórios — colocar antes de '/:id' para não conflitar */
router.get('/reports/resumo-mensal', vendasController.resumoMensal);
router.get('/reports/resumo-diario', vendasController.resumoDiario);
router.get('/reports/por-hora', vendasController.comparativoHora);

/* CRUD / listagem base */
router.get('/', vendasController.index);
router.get('/:id(\\d+)', vendasController.show);
router.post('/', vendasController.create);
router.put('/:id(\\d+)', vendasController.update);
router.delete('/:id(\\d+)', vendasController.destroy);

export default router;
