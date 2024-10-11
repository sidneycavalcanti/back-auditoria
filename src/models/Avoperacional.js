import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Caminho ajustado para ES Modules

import Loja from './Loja.js';
import Usuario from './Usuario.js';
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
  usuarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuario',
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
  lojaId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'loja',
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
Avoperacional.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
Avoperacional.belongsTo(Auditoria, { foreignKey: 'auditoriaId', as: 'auditoria' });
Avoperacional.belongsTo(Loja, { foreignKey: 'lojaId', as: 'loja' });




export default Avoperacional;
