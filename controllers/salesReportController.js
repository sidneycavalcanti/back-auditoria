const { Flow, Audit } = require('../models');

exports.createFlow = async (req, res) => {
  try {
    const flow = await Flow.create(req.body);
    res.status(201).json(flow);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllFlows = async (req, res) => {
  try {
    const flows = await Flow.findAll({
      include: [Audit]
    });
    res.status(200).json(flows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFlowById = async (req, res) => {
  try {
    const flow = await Flow.findByPk(req.params.id, {
      include: [Audit]
    });
    if (flow) {
      res.status(200).json(flow);
    } else {
      res.status(404).json({ error: 'Flow not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFlow = async (req, res) => {
  try {
    const [updated] = await Flow.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedFlow = await Flow.findByPk(req.params.id, {
        include: [Audit]
      });
      res.status(200).json(updatedFlow);
    } else {
      res.status(404).json({ error: 'Flow not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFlow = async (req, res) => {
  try {
    const deleted = await Flow.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Flow not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
