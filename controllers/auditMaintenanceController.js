const { AuditMaintenance } = require('../models');

exports.createAuditMaintenance = async (req, res) => {
  try {
    const auditMaintenance = await AuditMaintenance.create(req.body);
    res.status(201).json(auditMaintenance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllAuditMaintenances = async (req, res) => {
  try {
    const auditMaintenances = await AuditMaintenance.findAll();
    res.status(200).json(auditMaintenances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAuditMaintenanceById = async (req, res) => {
  try {
    const auditMaintenance = await AuditMaintenance.findByPk(req.params.id);
    if (auditMaintenance) {
      res.status(200).json(auditMaintenance);
    } else {
      res.status(404).json({ error: 'AuditMaintenance not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAuditMaintenance = async (req, res) => {
  try {
    const [updated] = await AuditMaintenance.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedAuditMaintenance = await AuditMaintenance.findByPk(req.params.id);
      res.status(200).json(updatedAuditMaintenance);
    } else {
      res.status(404).json({ error: 'AuditMaintenance not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAuditMaintenance = async (req, res) => {
  try {
    const deleted = await AuditMaintenance.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'AuditMaintenance not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
