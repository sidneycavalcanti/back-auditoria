const express = require('express');
const {
  createAuditAssignment,
  getAllAuditAssignments,
  getAuditAssignmentById,
  updateAuditAssignment,
  deleteAuditAssignment
} = require('../controllers/auditAssignmentController');
const router = express.Router();

router.post('/', createAuditAssignment);
router.get('/', getAllAuditAssignments);
router.get('/:id', getAuditAssignmentById);
router.put('/:id', updateAuditAssignment);
router.delete('/:id', deleteAuditAssignment);

module.exports = router;
