const { Loss, Audit, CauseLoss } = require('../models');

exports.createLoss = async (req, res) => {
  try {
    const loss = await Loss.create(req.body);
    res.status(201).json(loss);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllLosses = async (req, res) => {
  try {
    const losses = await Loss.findAll({
      include: [Audit, CauseLoss]
    });
    res.status(200).json(losses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLossById = async (req, res) => {
  try {
    const loss = await Loss.findByPk(req.params.id, {
      include: [Audit, CauseLoss]
    });
    if (loss) {
      res.status(200).json(loss);
    } else {
      res.status(404).json({ error: 'Loss not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLoss = async (req, res) => {
  try {
    const [updated] = await Loss.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedLoss = await Loss.findByPk(req.params.id, {
        include: [Audit, CauseLoss]
      });
      res.status(200).json(updatedLoss);
    } else {
      res.status(404).json({ error: 'Loss not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLoss = async (req, res) => {
  try {
    const deleted = await Loss.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Loss not found' });
    }
  } catch (error) {
    res.status{500).json({ error: error.message });
  }
};
