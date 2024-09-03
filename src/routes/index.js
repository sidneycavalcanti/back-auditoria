import { Router } from 'express';
import usuarioRoutes from './usuarioRoutes.js';
import categoriaRoutes from './categoriaRoutes.js';
import auditoriaRoutes from './auditoriaRoutes.js';
import avoperacionalRoustes from './avoperacionalRoustes.js';
import cadavoperacionalRoutes from './cadavoperacionalRoutes.js';
import cadquestoesRoutes from './cadquestoesRoutes.js';
import cadsexoRoutes from './cadsexoRoutes.js';
import formadepagamentoRoutes from './formadepagamentoRoutes.js';
import lojaRoutes from './lojaRoutes.js';
import motivodepausaRoutes from './motivodepausaRoutes.js';
import motivoperdasRoutes from './motivoperdasRoutes.js';
import questoesRoutes from './questoesRoutes.js';
import pausaRoutes from './pausaRoutes.js';
import perdasRoutes from './perdasRoutes.js';
import vendasRoutes from './vendasRoutes.js';
import anotacaoRoutes from './anotacaoRoutes.js';




const router = Router();

// Registrar as rotas de usuário e categoria
router.use('/usuarios', usuarioRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/anotacao', anotacaoRoutes);
router.use('/auditoria', auditoriaRoutes);
router.use('/avoperacional', avoperacionalRoustes);
router.use('/cadavoperacional', cadavoperacionalRoutes);
router.use('/cadquestoes', cadquestoesRoutes);
router.use('/cadsexo', cadsexoRoutes);
router.use('/formadepagamento', formadepagamentoRoutes);
router.use('/loja', lojaRoutes);
router.use('/motivodepausa', motivodepausaRoutes);
router.use('/motivoperdas', motivoperdasRoutes);
router.use('/questoes', questoesRoutes);
router.use('/pausa', pausaRoutes);
router.use('/perdas', perdasRoutes);
router.use('/vendas', vendasRoutes);

export default router;
