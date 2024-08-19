const { StandardPhrase } = require('../models');

exports.createStandardPhrase = async (req, res) => {
  try {
    const standardPhrase = await StandardPhrase.create(req.body);
    res.status(201).json(standardPhrase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllStandardPhrases = async (req, res) => {
  try {
    const standardPhrases = await StandardPhrase.findAll();
    res.status(200).json(standardPhrases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStandardPhraseById = async (req, res) => {
  try {
    const standardPhrase = await StandardPhrase.findByPk(req.params.id);
    if (standardPhrase) {
      res.status(200).json(standardPhrase);
    } else {
      res.status(404).json({ error: 'StandardPhrase not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStandardPhrase = async (req, res) => {
  try {
    const [updated] = await StandardPhrase.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedStandardPhrase = await StandardPhrase.findByPk(req.params.id);
      res.status(200).json(updatedStandardPhrase);
    } else {
      res.status(404).json({ error: 'StandardPhrase not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteStandardPhrase = async (req, res) => {
  try {
    const deleted = await StandardPhrase.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'StandardPhrase not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
