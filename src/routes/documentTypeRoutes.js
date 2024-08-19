const express = require('express');
const {
  createDocumentType,
  getAllDocumentTypes,
  getDocumentTypeById,
  updateDocumentType,
  deleteDocumentType
} = require('../controllers/documentTypeController');
const router = express.Router();

router.post('/', createDocumentType);
router.get('/', getAllDocumentTypes);
router.get('/:id', getDocumentTypeById);
router.put('/:id', updateDocumentType);
router.delete('/:id', deleteDocumentType);

module.exports = router;
