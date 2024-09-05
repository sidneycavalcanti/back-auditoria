import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config(); // Não esqueça de configurar o dotenv para carregar as variáveis de ambiente

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false, // Isso desativa os logs do Sequelize, incluindo warnings
  // Outras configurações
});

export default sequelize;

