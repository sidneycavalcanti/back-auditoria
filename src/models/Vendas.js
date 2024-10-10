import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Caminho ajustado para ES Modules
import Auditoria from './Auditoria.js';
import Usuario from './Usuario.js';
import Formadepagamento from './Formadepagamento.js';
import Sexo from './Cadsexo.js';
import Loja from './Loja.js';

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

// Definindo a relação: Produto pertence a Categoria
Vendas.belongsTo(Auditoria, { foreignKey: 'auditoriaId', as: 'auditoria' });
Vendas.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
Vendas.belongsTo(Formadepagamento, { foreignKey: 'formadepagamentoId', as: 'formadepagamento' });
Vendas.belongsTo(Sexo, { foreignKey: 'sexoId', as: 'sexo' });
Vendas.belongsTo(Loja, { foreignKey: 'lojaId', as: 'loja' });

export default Vendas;
