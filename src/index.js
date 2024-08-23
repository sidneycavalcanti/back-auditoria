require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('../src/config/database');
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use(express.json());
app.use('/src/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });
