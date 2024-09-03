import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Caminho ajustado para ES Modules

const Auditoria = sequelize.define('Auditoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  lojaId: {
    type: DataTypes.INTEGER,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
  },
  criadorId: {
    type: DataTypes.INTEGER,
  },
  data: {
    type: DataTypes.DATE,
  },
  fluxoespeculador: {
    type: DataTypes.INTEGER,
  },
  fluxoacompanhante: {
    type: DataTypes.INTEGER,
  },
  fluxooutros: {
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
  tableName: 'auditoria',
  timestamps: true, // Mantém o controle automático de createdAt e updatedAt
  underscored: false, // Desativa a conversão automática para snake_case
});

export default Auditoria;
