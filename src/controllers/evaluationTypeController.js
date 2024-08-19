const { EvaluationType } = require('../models');

exports.createEvaluationType = async (req, res) => {
  try {
    const evaluationType = await EvaluationType.create(req.body);
    res.status(201).json(evaluationType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllEvaluationTypes = async (req, res) => {
  try {
    const evaluationTypes = await EvaluationType.findAll();
    res.status(200).json(evaluationTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEvaluationTypeById = async (req, res) => {
  try {
    const evaluationType = await EvaluationType.findByPk(req.params.id);
    if (evaluationType) {
      res.status(200).json(evaluationType);
    } else {
      res.status(404).json({ error: 'EvaluationType not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEvaluationType = async (req, res) => {
  try {
    const [updated] = await EvaluationType.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedEvaluationType = await EvaluationType.findByPk(req.params.id);
      res.status(200).json(updatedEvaluationType);
    } else {
      res.status(404).json({ error: 'EvaluationType not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEvaluationType = async (req, res) => {
  try {
    const deleted = await EvaluationType.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'EvaluationType not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
