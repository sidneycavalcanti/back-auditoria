import { Router } from 'express';
import formadepagamentoController from '../controllers/formadepagamentoController.js';

const router = new Router();

router.get('/', formadepagamentoController.index);
router.get('/:id', formadepagamentoController.show);
router.post('/', formadepagamentoController.create);
router.put('/:id', formadepagamentoController.update);
router.delete('/:id', formadepagamentoController.destroy);

export default router;
