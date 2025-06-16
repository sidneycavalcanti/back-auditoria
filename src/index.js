import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'; // Importa o CORS
import routes from './routes/index.js';
import sequelize from './config/database.js'; // Ajuste o caminho conforme necessário
import compression from 'compression';


dotenv.config();

const app = express();

app.use(cors());
app.use(compression()); // ✅ compressão ativada aqui


// Configurações básicas
app.use(express.json());

// Rotas
app.use(routes);

// Rota padrão
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Servidor está rodando com sucesso! 🚀' });
});

// Porta
const PORT = process.env.PORT || 3000;

// Conexão com o banco de dados e inicialização do servidor
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

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado no servidor!' });

  try {
    const validator = require('validator');
    console.log('Validator loaded successfully:', validator);
  } catch (err) {
    console.error('Failed to load validator:', err);
  }
});
