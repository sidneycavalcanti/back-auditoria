const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Vendas = sequelize.define('Vendas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  auditoria_id: {
    type: DataTypes.INTEGER,
  },
  formadepagamento_id: {
    type: DataTypes.INTEGER,
  },
  loja_id: {
    type: DataTypes.INTEGER,
  },
  sexo_id: {
    type: DataTypes.INTEGER,
  },
  faixaetaria: {
    type: DataTypes.INTEGER,
  },
  usuario_id: {
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
  tableName: 'vendas',
  timestamps: false,
});

module.exports = Vendas;
