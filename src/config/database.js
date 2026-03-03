import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    logging: false,

    // Afeta somente escrita de DATETIME pelo Sequelize
    timezone: '-03:00',

    // Impede o mysql2 de criar Date (evita shift de fuso na leitura)
    dialectOptions: {
      connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT_MS || 10000),
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
      max: Number(process.env.DB_POOL_MAX || 5),
      min: Number(process.env.DB_POOL_MIN || 0),
      acquire: Number(process.env.DB_POOL_ACQUIRE_MS || 30000),
      idle: Number(process.env.DB_POOL_IDLE_MS || 10000),
      afterCreate: (conn, done) => {
        conn.query("SET time_zone = '-03:00';", (err) => done(err, conn));
      },
    },
  }
);

export default sequelize;
