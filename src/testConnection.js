import dotenv from 'dotenv';
dotenv.config(); // Importa as variáveis de ambiente
import sequelize from './config/database.js'; // Importa a configuração do Sequelize

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados foi bem-sucedida!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  } finally {
    await sequelize.close();
  }
}

testConnection();
