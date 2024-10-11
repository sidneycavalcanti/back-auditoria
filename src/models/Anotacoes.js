import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Caminho ajustado para ES Modules
import Loja from './Loja.js';
import Usuario from './Usuario.js';
import Auditoria from './Auditoria.js';


const Anotacoes = sequelize.define('Anotacoes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  auditoriaId: {
    type: DataTypes.INTEGER,
    references:{
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
  lojaId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'loja',
      key: 'id',
    },
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
  tableName: 'anotacoes',
  timestamps: true, // Mantém o controle automático de createdAt e updatedAt
  underscored: false, // Desativa a conversão automática para snake_case
});

Anotacoes.belongsTo(Loja, { foreignKey: 'lojaId', as: 'loja' });
Anotacoes.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
Anotacoes.belongsTo(Auditoria, { foreignKey: 'auditoriaId', as: 'auditoria' });

export default Anotacoes; // Certifique-se de que o modelo está sendo exportado como default
