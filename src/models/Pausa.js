import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Caminho ajustado para ES Modules
import Usuario from './Usuario.js';
import Motivodepausa from './Motivodepausa.js';
import Auditoria from './Auditoria.js';
import Loja from './Loja.js';

const Pausa = sequelize.define('Pausa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  motivodepausaId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'motivodepausa',
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
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'pausa',
  timestamps: true, // Mantém o controle automático de createdAt e updatedAt
  underscored: false, // Desativa a conversão automática para snake_case
});

// Definindo a relação: Produto pertence a Categoria
Pausa.belongsTo(Motivodepausa, { foreignKey: 'motivodepausaId', as: 'motivodepausa' });
Pausa.belongsTo(Auditoria, { foreignKey: 'auditoriaId', as: 'auditoria' });
Pausa.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });


export default Pausa;
