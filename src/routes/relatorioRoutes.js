import { Router } from 'express';
import relatorioController from '../controllers/relatorioController.js';

const router = new Router();

// ✅ mensal por loja
router.get('/mensal', relatorioController.mensal);


// ✅ novo: vendas perdidas detalhado (tabela do print)
router.get("/vendas-perdidas-detalhado", relatorioController.vendasPerdidasDetalhado);

// ✅ novo relatório: questionário de avaliação
router.get("/questionario-avaliacao", relatorioController.questionarioAvaliacao);

// ✅ NOVA rota do dashboard
router.get("/dashboard", relatorioController.dashboard);


export default router;