import { Router } from 'express';
import relatorioController from '../controllers/relatorioController.js';

const router = new Router();

// ✅ mensal por loja
router.get('/mensal', relatorioController.mensal);


// ✅ novo: vendas perdidas detalhado (tabela do print)
router.get("/vendas-perdidas-detalhado", relatorioController.vendasPerdidasDetalhado);

export default router;