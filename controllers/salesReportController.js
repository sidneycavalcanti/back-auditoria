const { SalesReport } = require('../models');

exports.createSalesReport = async (req, res) => {
  try {
    const salesReport = await SalesReport.create(req.body);
    res.status(201).json(salesReport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllSalesReports = async (req, res) => {
  try {
    const salesReports = await SalesReport.findAll();
    res.status(200).json(salesReports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSalesReportById = async (req, res) => {
  try {
    const salesReport = await SalesReport.findByPk(req.params.id);
    if (salesReport) {
      res.status(200).json(salesReport);
    } else {
      res.status(404).json({ error: 'SalesReport not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSalesReport = async (req, res) => {
  try {
    const [updated] = await SalesReport.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedSalesReport = await SalesReport.findByPk(req.params.id);
      res.status(200).json(updatedSalesReport);
    } else {
      res.status(404).json({ error: 'SalesReport not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSalesReport = async (req, res) => {
  try {
    const deleted = await SalesReport.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'SalesReport not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
