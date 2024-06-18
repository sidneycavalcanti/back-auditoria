// middleware/auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await db.User.create({ username: req.body.username, password: hashedPassword });
    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await db.User.findOne({ where: { username: req.body.username } });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { authenticateToken, registerUser, loginUser };
