import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Caminho ajustado para ES Modules

const Loja = sequelize.define('Loja', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  obs: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  situacao: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  tipo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  codigo: {
    type: DataTypes.INTEGER,
    defaultValue: true,
  },
  luc: {
    type: DataTypes.STRING,
    defaultValue: true,
  },
  piso: {
    type: DataTypes.STRING,
    defaultValue: true,
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
  tableName: 'loja',
  timestamps: true, // Mantém o controle automático de createdAt e updatedAt
  underscored: false, // Desativa a conversão automática para snake_case
});

export default Loja; // Certifique-se de que o modelo está sendo exportado como default
