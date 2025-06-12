import { Router } from 'express';
import relatorioController from '../controllers/relatorioController.js';

const router = Router();

// Relatório geral (GET /relatorio)
//router.get('/', relatorioController.index);
router.get('/', relatorioController.gerarRelatorio);

// Outros endpoints de relatório, se quiser, ex:
// router.get('/mensal', relatorioController.mensal);
// router.get('/custom', relatorioController.custom);

export default router;