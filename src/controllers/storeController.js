const { Store } = require('../models');

exports.createStore = async (req, res) => {
  try {
    const store = await Store.create(req.body);
    res.status(201).json(store);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStoreById = async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (store) {
      res.status(200).json(store);
    } else {
      res.status(404).json({ error: 'Store not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStore = async (req, res) => {
  try {
    const [updated] = await Store.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedStore = await Store.findByPk(req.params.id);
      res.status(200).json(updatedStore);
    } else {
      res.status(404).json({ error: 'Store not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteStore = async (req, res) => {
  try {
    const deleted = await Store.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Store not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
