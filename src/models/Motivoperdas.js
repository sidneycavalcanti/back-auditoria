import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Caminho ajustado para ES Modules

const Motivoperdas = sequelize.define('Motivoperdas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  situacao: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  obs: {
    type: DataTypes.TEXT,
    allowNull: false,
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
  tableName: 'motivoperdas',
  timestamps: true, // Mantém o controle automático de createdAt e updatedAt
  underscored: false, // Desativa a conversão automática para snake_case
});

export default Motivoperdas; // Certifique-se de que o modelo está sendo exportado como default
