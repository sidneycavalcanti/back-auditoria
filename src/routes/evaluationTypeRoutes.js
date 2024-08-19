const express = require('express');
const {
  createEvaluationType,
  getAllEvaluationTypes,
  getEvaluationTypeById,
  updateEvaluationType,
  deleteEvaluationType
} = require('../controllers/evaluationTypeController');  // Corrija o caminho se necessário
const router = express.Router();

router.post('/', createEvaluationType);
router.get('/', getAllEvaluationTypes);
router.get('/:id', getEvaluationTypeById);
router.put('/:id', updateEvaluationType);
router.delete('/:id', deleteEvaluationType);

module.exports = router;
