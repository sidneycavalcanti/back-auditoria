import dotenv from 'dotenv';
import express from 'express';
import routes from './routes/index.js';
import sequelize from './config/database.js'; // Ajuste o caminho conforme necessário


dotenv.config();

const app = express();
app.use(express.json());

// usar o reador central
app.use(routes); // Corrigido o caminho da rota

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
