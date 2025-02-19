import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Caminho ajustado para ES Modules
import Motivodepausa from './Motivodepausa.js';
import Auditoria from './Auditoria.js';

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
  auditoriaId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'auditoria',
      key: 'id',
    }
  },
  status: { // 🔥 Novo campo
    type: DataTypes.TINYINT,
    defaultValue: 1, // ✅ Começa como "em pausa"
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


export default Pausa;
