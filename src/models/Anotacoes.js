import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Caminho ajustado para ES Modules

const Anotacao = sequelize.define('Anotacao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  auditoriaId: {
    type: DataTypes.INTEGER,
    defaultValue: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    defaultValue: true,
  },
  lojaId: {
    type: DataTypes.INTEGER,
    defaultValue: true,
  },
  descricao: {
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
  tableName: 'anotacao',
  timestamps: true, // Mantém o controle automático de createdAt e updatedAt
  underscored: false, // Desativa a conversão automática para snake_case
});

export default Anotacao; // Certifique-se de que o modelo está sendo exportado como default
