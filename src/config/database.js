import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config(); // Não esqueça de configurar o dotenv para carregar as variáveis de ambiente

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

export default sequelize;
