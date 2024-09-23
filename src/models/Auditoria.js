import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Caminho ajustado para ES Modules
import Loja from './Loja.js';
import Usuario from './Usuario.js';

const Auditoria = sequelize.define('Auditoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  lojaId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'loja',
      key: 'id',
    },
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuario',
      key: 'id',
    }
  },
  criadorId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'criador',
      key: 'id',
    }
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

// Definindo a relação: Produto pertence a Categoria
Auditoria.belongsTo(Loja, { foreignKey: 'lojaId', as: 'loja' });
Auditoria.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
Auditoria.belongsTo(Usuario, { foreignKey: 'criadorId', as: 'criador' });

export default Auditoria;
