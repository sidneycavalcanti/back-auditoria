const express = require('express');
const {
  createAuditMaintenance,
  getAllAuditMaintenances,
  getAuditMaintenanceById,
  updateAuditMaintenance,
  deleteAuditMaintenance
} = require('../controllers/auditMaintenanceController');  // Corrija o caminho se necessário
const router = express.Router();

router.post('/', createAuditMaintenance);
router.get('/', getAllAuditMaintenances);
router.get('/:id', getAuditMaintenanceById);
router.put('/:id', updateAuditMaintenance);
router.delete('/:id', deleteAuditMaintenance);

module.exports = router;
