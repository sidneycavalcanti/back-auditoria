const { PaymentMethod } = require('../models');

exports.createPaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethod.create(req.body);
    res.status(201).json(paymentMethod);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.findAll();
    res.status(200).json(paymentMethods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPaymentMethodById = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethod.findByPk(req.params.id);
    if (paymentMethod) {
      res.status(200).json(paymentMethod);
    } else {
      res.status(404).json({ error: 'PaymentMethod not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePaymentMethod = async (req, res) => {
  try {
    const [updated] = await PaymentMethod.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedPaymentMethod = await PaymentMethod.findByPk(req.params.id);
      res.status(200).json(updatedPaymentMethod);
    } else {
      res.status(404).json({ error: 'PaymentMethod not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePaymentMethod = async (req, res) => {
  try {
    const deleted = await PaymentMethod.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'PaymentMethod not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
