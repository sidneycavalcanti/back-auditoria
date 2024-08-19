const express = require('express');
const {
  createPauseReason,
  getAllPauseReasons,
  getPauseReasonById,
  updatePauseReason,
  deletePauseReason
} = require('../controllers/pauseReasonController');
const router = express.Router();

router.post('/', createPauseReason);
router.get('/', getAllPauseReasons);
router.get('/:id', getPauseReasonById);
router.put('/:id', updatePauseReason);
router.delete('/:id', deletePauseReason);

module.exports = router;
