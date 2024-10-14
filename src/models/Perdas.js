import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Caminho ajustado para ES Modules
import Auditoria from './Auditoria.js';
import Formadepagamento from './Formadepagamento.js';
import Motivodepausa from './Motivodepausa.js';

const Perdas = sequelize.define('Perdas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  motivoperdasId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'motivopausa',
      key: 'id',
    }
  },
  auditoriaId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'auditoria',
      key: 'id',
    }
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuario',
      key: 'id',
    }
  },
  formadepagamentoId: {
    type: DataTypes.INTEGER,
  },
  lojaId: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.NOW,
  },
  sexoId: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.NOW,
  },
  faixaetaria: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.NOW,
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
  tableName: 'perdas',
  timestamps: true, // Mantém o controle automático de createdAt e updatedAt
  underscored: false, // Desativa a conversão automática para snake_case
});

Perdas.belongsTo(Auditoria, {foreignKey: 'auditoriaId', as: 'auditoria'});
Perdas.belongsTo(Formadepagamento, {foreignKey: 'formadepagamentoId', as: 'formadepagamento'});
Perdas.belongsTo(Motivodepausa, {foreignKey: 'motivodepausaId', as: 'motivodepausa'});

export default Perdas;
