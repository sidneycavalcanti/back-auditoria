const { DocumentType } = require('../models');

exports.createDocumentType = async (req, res) => {
  try {
    const documentType = await DocumentType.create(req.body);
    res.status(201).json(documentType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllDocumentTypes = async (req, res) => {
  try {
    const documentTypes = await DocumentType.findAll();
    res.status(200).json(documentTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDocumentTypeById = async (req, res) => {
  try {
    const documentType = await DocumentType.findByPk(req.params.id);
    if (documentType) {
      res.status(200).json(documentType);
    } else {
      res.status(404).json({ error: 'DocumentType not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDocumentType = async (req, res) => {
  try {
    const [updated] = await DocumentType.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedDocumentType = await DocumentType.findByPk(req.params.id);
      res.status(200).json(updatedDocumentType);
    } else {
      res.status(404).json({ error: 'DocumentType not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDocumentType = async (req, res) => {
  try {
    const deleted = await DocumentType.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'DocumentType not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
