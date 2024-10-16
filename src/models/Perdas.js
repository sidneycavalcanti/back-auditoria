import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Caminho ajustado para ES Modules
import Auditoria from './Auditoria.js';
import Motivoperdas from './Motivoperdas.js';

const Perdas = sequelize.define('Perdas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  motivoperdasId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'motivoperdas',
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

Perdas.belongsTo(Auditoria, { foreignKey: 'auditoriaId', as: 'auditoria' });
Perdas.belongsTo(Motivoperdas, { foreignKey: 'motivoperdasId', as: 'motivoperdas' });

export default Perdas;
