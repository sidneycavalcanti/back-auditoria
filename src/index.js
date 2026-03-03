import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'; // Importa o CORS
import routes from './routes/index.js';
import sequelize from './config/database.js'; // Ajuste o caminho conforme necessÃ¡rio
import compression from 'compression';
import { setupSwagger } from './swagger.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(compression()); // âœ… compressÃ£o ativada aqui


// Swagger documentaÃ§Ã£o (instalado antes das demais rotas para nÃ£o exigir autenticaÃ§Ã£o)
setupSwagger(app);

// ConfiguraÃ§Ãµes bÃ¡sicas
app.use(express.json());

// Rotas
app.use(routes);

// Rota padrÃ£o
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Servidor estÃ¡ rodando com sucesso! ðŸš€' });
});

// Porta
const PORT = process.env.PORT || 3000;

// ConexÃ£o com o banco de dados e inicializaÃ§Ã£o do servidor
sequelize.authenticate()
  .then(() => {
    console.log('ConexÃ£o com o banco de dados bem-sucedida.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Erro ao conectar ao banco de dados:', error);
    if (error?.original?.code === 'ETIMEDOUT' || error?.parent?.code === 'ETIMEDOUT') {
      console.error('Dica: timeout de rede. Verifique DB_HOST/DB_PORT, allowlist/firewall e se o banco aceita conexoes externas.');
    }
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
