import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Caminho ajustado para ES Modules
import Auditoria from './Auditoria.js';

const Questoes = sequelize.define('Questoes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cadquestoesId: {
    type: DataTypes.INTEGER,
  },
  auditoriaId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'auditoria',
      key: 'id',
    }
  },
  resposta: {
    type: DataTypes.STRING,
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
  tableName: 'questoes',
  timestamps: true, // Mantém o controle automático de createdAt e updatedAt
  underscored: false, // Desativa a conversão automática para snake_case
});

Questoes.belongsTo(Auditoria, { foreignKey: 'auditoriaId', as: 'auditoria' });

export default Questoes;
