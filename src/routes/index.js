import { Router } from 'express';
import { authMiddleware } from '../services/authMiddleware.js';
import usuarioRoutes from './usuarioRoutes.js';
import categoriaRoutes from './categoriaRoutes.js';
import auditoriaRoutes from './auditoriaRoutes.js';
import avoperacionalRoutes from './avoperacionalRoustes.js'; // corrigido o typo
import cadavoperacionalRoutes from './cadavoperacionalRoutes.js';
import cadquestoesRoutes from './cadquestoesRoutes.js';
import cadsexoRoutes from './cadsexoRoutes.js';
import formadepagamentoRoutes from './formadepagamentoRoutes.js';
import lojaRoutes from './lojaRoutes.js';
import motivodepausaRoutes from './motivodepausaRoutes.js';
import motivoperdasRoutes from './motivoperdasRoutes.js';
import pausaRoutes from './pausaRoutes.js';
import perdasRoutes from './perdasRoutes.js';
import vendasRoutes from './vendasRoutes.js';
import anotacaoRoutes from './anotacaoRoutes.js';
import fluxoRoutes from './fluxoRoutes.js';
import authRoutes from './authRoutes.js'; // Nova rota de autenticação

const router = Router();

// Rota de autenticação (não protegida)
router.use('/auth', authRoutes);

// Aplicar middleware de autenticação para todas as rotas abaixo
router.use(authMiddleware);

// Registrar as rotas protegidas
router.use('/usuarios', usuarioRoutes); 
router.use('/categorias', categoriaRoutes);
router.use('/anotacao', anotacaoRoutes);
router.use('/auditoria', auditoriaRoutes);
router.use('/avoperacional', avoperacionalRoutes);
router.use('/cadavoperacional', cadavoperacionalRoutes);
router.use('/cadquestoes', cadquestoesRoutes);
router.use('/cadsexo', cadsexoRoutes);
router.use('/formadepagamento', formadepagamentoRoutes);
router.use('/loja', lojaRoutes);
router.use('/motivodepausa', motivodepausaRoutes);
router.use('/motivoperdas', motivoperdasRoutes);
router.use('/pausa', pausaRoutes);
router.use('/perdas', perdasRoutes);
router.use('/vendas', vendasRoutes);
router.use('/fluxo', fluxoRoutes);



export default router;
