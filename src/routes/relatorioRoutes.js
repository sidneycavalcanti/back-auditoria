import { Router } from 'express';
import relatorioController from '../controllers/relatorioController.js';

const router = new Router();

// ✅ mensal por loja
router.get('/mensal', relatorioController.mensal);

export default router;