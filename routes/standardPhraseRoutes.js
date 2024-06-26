const express = require('express');
const {
  createStandardPhrase,
  getAllStandardPhrases,
  getStandardPhraseById,
  updateStandardPhrase,
  deleteStandardPhrase
} = require('../controllers/standardPhraseController');  // Corrija o caminho se necessário
const router = express.Router();

router.post('/', createStandardPhrase);
router.get('/', getAllStandardPhrases);
router.get('/:id', getStandardPhraseById);
router.put('/:id', updateStandardPhrase);
router.delete('/:id', deleteStandardPhrase);

module.exports = router;
