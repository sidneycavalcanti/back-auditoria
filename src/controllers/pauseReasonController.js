const { PauseReason } = require('../models');

exports.createPauseReason = async (req, res) => {
  try {
    const pauseReason = await PauseReason.create(req.body);
    res.status(201).json(pauseReason);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPauseReasons = async (req, res) => {
  try {
    const pauseReasons = await PauseReason.findAll();
    res.status(200).json(pauseReasons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPauseReasonById = async (req, res) => {
  try {
    const pauseReason = await PauseReason.findByPk(req.params.id);
    if (pauseReason) {
      res.status(200).json(pauseReason);
    } else {
      res.status(404).json({ error: 'PauseReason not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePauseReason = async (req, res) => {
  try {
    const [updated] = await PauseReason.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedPauseReason = await PauseReason.findByPk(req.params.id);
      res.status(200).json(updatedPauseReason);
    } else {
      res.status(404).json({ error: 'PauseReason not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePauseReason = async (req, res) => {
  try {
    const deleted = await PauseReason.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'PauseReason not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
