const express = require('express');
const { sequelize } = require('../models');
const userRoutes = require('./routes/userRoutes'); // Verifique o caminho do arquivo
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
