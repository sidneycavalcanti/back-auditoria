import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Caminho ajustado para ES Modules

import Auditoria from './Auditoria.js';
import Cadavoperacional from './Cadavoperacional.js';


const Avoperacional = sequelize.define('Avoperacional', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cadavoperacionalId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'cadavoperacional',
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
  tableName: 'avoperacional',
  timestamps: true, // Mantém o controle automático de createdAt e updatedAt
  underscored: false, // Desativa a conversão automática para snake_case
});


Avoperacional.belongsTo(Cadavoperacional, { foreignKey: 'cadavoperacionalId', as: 'cadavoperacional' });
Avoperacional.belongsTo(Auditoria, { foreignKey: 'auditoriaId', as: 'auditoria' });



export default Avoperacional;
