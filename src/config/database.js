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
  logging: false,
  timezone: '-03:00', // usado pelo Sequelize para escrever datas
  dialectOptions: {
    dateStrings: true, // devolve DATETIME como string (sem aplicar offset)
    typeCast: function (field, next) {
      if (field.type === 'DATETIME' || field.type === 'TIMESTAMP') {
        return new Date(field.string()); // evita shift inesperado
      }
      return next();
    },
  },
  pool: {
    // força o fuso na sessão MySQL
    afterCreate: (conn, done) => {
      conn.query("SET time_zone = '-03:00';", (err) => done(err, conn));
    }
  }
});


export default sequelize;

