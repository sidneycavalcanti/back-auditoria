const { DataTypes } = require('sequelize');
const sequelize = require('../../src/config/database');

const Vendas = sequelize.define('Vendas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  auditoriaId: {
    type: DataTypes.INTEGER,
  },
  formadepagamentoId: {
    type: DataTypes.INTEGER,
  },
  lojaId: {
    type: DataTypes.INTEGER,
  },
  sexoId: {
    type: DataTypes.INTEGER,
  },
  faixaetaria: {
    type: DataTypes.INTEGER,
  },
  usuarioId: {
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
  timestamps: true, // Mantém o controle automático de createdAt e updatedAt
  underscored: false, // Desativa a conversão automática para snake_case
});

module.exports = Vendas;
