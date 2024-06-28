const { AuditAssignment, Store, User } = require('../models');

exports.createAuditAssignment = async (req, res) => {
  try {
    const auditAssignment = await AuditAssignment.create(req.body);
    res.status(201).json(auditAssignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllAuditAssignments = async (req, res) => {
  try {
    const auditAssignments = await AuditAssignment.findAll({
      include: [Store, User]
    });
    res.status(200).json(auditAssignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAuditAssignmentById = async (req, res) => {
  try {
    const auditAssignment = await AuditAssignment.findByPk(req.params.id, {
      include: [Store, User]
    });
    if (auditAssignment) {
      res.status(200).json(auditAssignment);
    } else {
      res.status(404).json({ error: 'AuditAssignment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAuditAssignment = async (req, res) => {
  try {
    const [updated] = await AuditAssignment.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedAuditAssignment = await AuditAssignment.findByPk(req.params.id, {
        include: [Store, User]
      });
      res.status(200).json(updatedAuditAssignment);
    } else {
      res.status(404).json({ error: 'AuditAssignment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAuditAssignment = async (req, res) => {
  try {
    const deleted = await AuditAssignment.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'AuditAssignment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
