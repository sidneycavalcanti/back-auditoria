const express = require('express');
const {
  createPaymentMethod,
  getAllPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethod,
  deletePaymentMethod
} = require('../controllers/paymentMethodController');
const router = express.Router();

router.post('/', createPaymentMethod);
router.get('/', getAllPaymentMethods);
router.get('/:id', getPaymentMethodById);
router.put('/:id', updatePaymentMethod);
router.delete('/:id', deletePaymentMethod);

module.exports = router;
