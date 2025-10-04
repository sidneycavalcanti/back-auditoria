import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,

    // Afeta somente escrita de DATETIME pelo Sequelize
    timezone: '-03:00',

    // Impede o mysql2 de criar Date (evita shift de fuso na leitura)
    dialectOptions: {
      dateStrings: true,
      typeCast: function (field, next) {
        if (field.type === 'DATETIME' || field.type === 'TIMESTAMP') {
          return field.string(); // 'YYYY-MM-DD HH:mm:ss'
        }
        return next();
      },
    },

    // Garante fuso da sessão no MySQL (sem precisar permissão global)
    pool: {
      afterCreate: (conn, done) => {
        conn.query("SET time_zone = '-03:00';", (err) => done(err, conn));
      },
    },
  }
);

export default sequelize;
