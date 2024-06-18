// routes.js
const express = require('express');
const { authenticateToken, registerUser, loginUser } = require('./middleware/auth');
const db = require('./models');

const router = express.Router();

// Rota de registro
router.post('/register', registerUser);

// Rota de login
router.post('/login', loginUser);

// Rota para obter todas as auditorias (protegida)
router.get('/audits', authenticateToken, async (req, res) => {
  const audits = await db.Audit.findAll({ where: { UserId: req.user.id } });
  res.json(audits);
});

// Rota para criar uma nova auditoria (protegida)
router.post('/audits', authenticateToken, async (req, res) => {
  const audit = await db.Audit.create({ action: req.body.action, details: req.body.details, UserId: req.user.id });
  res.json(audit);
});

module.exports = router;
