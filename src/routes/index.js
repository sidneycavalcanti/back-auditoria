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
router.use('/usuarios', usuarioRoutes); //teste feito
router.use('/categorias', categoriaRoutes); //teste feito
router.use('/anotacao', anotacaoRoutes); //teste feito
router.use('/auditoria', auditoriaRoutes); //teste feito
router.use('/avoperacional', avoperacionalRoustes); //teste feito
router.use('/cadavoperacional', cadavoperacionalRoutes); //teste feito
router.use('/cadquestoes', cadquestoesRoutes);
router.use('/cadsexo', cadsexoRoutes); //teste feito
router.use('/formadepagamento', formadepagamentoRoutes); //teste feito
router.use('/loja', lojaRoutes); //teste feito
router.use('/motivodepausa', motivodepausaRoutes); //teste feito
router.use('/motivoperdas', motivoperdasRoutes); //teste feito
router.use('/questoes', questoesRoutes);
router.use('/pausa', pausaRoutes);
router.use('/perdas', perdasRoutes);
router.use('/vendas', vendasRoutes); //teste feito.

export default router;
