const express = require('express');
const {
  createCauseLoss,
  getAllCauseLosses,
  getCauseLossById,
  updateCauseLoss,
  deleteCauseLoss
} = require('../controllers/causeLossController');
const router = express.Router();

router.post('/', createCauseLoss);
router.get('/', getAllCauseLosses);
router.get('/:id', getCauseLossById);
router.put('/:id', updateCauseLoss);
router.delete('/:id', deleteCauseLoss);

module.exports = router;
