const { DataTypes } = require('sequelize');
const sequelize = require('../../src/config/database');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categoria_id: {
    type: DataTypes.INTEGER,
  },
  situacao: {
    type: DataTypes.BOOLEAN,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'usuario',
  timestamps: false,
});

module.exports = Usuario;
