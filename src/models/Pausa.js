const { DataTypes } = require('sequelize');
const sequelize = require('../../src/config/database');

const Pausa = sequelize.define('Pausa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  motivodepausaId: {
    type: DataTypes.INTEGER,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
  },
  auditoriaId: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'pausa',
  timestamps: true, // Mantém o controle automático de createdAt e updatedAt
  underscored: false, // Desativa a conversão automática para snake_case
});

module.exports = Pausa;
