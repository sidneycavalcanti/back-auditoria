const express = require('express');
const {
  createFlow,
  getAllFlows,
  getFlowById,
  updateFlow,
  deleteFlow
} = require('../controllers/flowController');
const router = express.Router();

router.post('/', createFlow);
router.get('/', getAllFlows);
router.get('/:id', getFlowById);
router.put('/:id', updateFlow);
router.delete('/:id', deleteFlow);

module.exports = router;
