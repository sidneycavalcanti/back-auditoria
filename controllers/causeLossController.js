const { CauseLoss } = require('../models');

exports.createCauseLoss = async (req, res) => {
  try {
    const causeLoss = await CauseLoss.create(req.body);
    res.status(201).json(causeLoss);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllCauseLosses = async (req, res) => {
  try {
    const causeLosses = await CauseLoss.findAll();
    res.status(200).json(causeLosses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCauseLossById = async (req, res) => {
  try {
    const causeLoss = await CauseLoss.findByPk(req.params.id);
    if (causeLoss) {
      res.status(200).json(causeLoss);
    } else {
      res.status(404).json({ error: 'CauseLoss not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCauseLoss = async (req, res) => {
  try {
    const [updated] = await CauseLoss.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedCauseLoss = await CauseLoss.findByPk(req.params.id);
      res.status(200).json(updatedCauseLoss);
    } else {
      res.status(404).json({ error: 'CauseLoss not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCauseLoss = async (req, res) => {
  try {
    const deleted = await CauseLoss.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'CauseLoss not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
