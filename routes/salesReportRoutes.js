const express = require('express');
const {
  createSalesReport,
  getAllSalesReports,
  getSalesReportById,
  updateSalesReport,
  deleteSalesReport
} = require('../controllers/salesReportController');
const router = express.Router();

router.post('/', createSalesReport);
router.get('/', getAllSalesReports);
router.get('/:id', getSalesReportById);
router.put('/:id', updateSalesReport);
router.delete('/:id', deleteSalesReport);

module.exports = router;
