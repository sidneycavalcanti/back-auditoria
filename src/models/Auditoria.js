import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 
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
    }
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
      model: 'usuario', // ou 'criador', dependendo de como está seu model real
      key: 'id',
    }
  },
  data: {
    type: DataTypes.DATE,
  },
  horaInicial: {
    type: DataTypes.TIME,
    allowNull: true,
    defaultValue: '00:00:00', // se quiser um valor padrão
  },
  horaFinal: {
    type: DataTypes.TIME,
    allowNull: true,
    defaultValue: '00:00:00', // se quiser um valor padrão
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
  timestamps: true,
  underscored: false,
});

Auditoria.belongsTo(Loja, { foreignKey: 'lojaId', as: 'loja' });
Auditoria.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
Auditoria.belongsTo(Usuario, { foreignKey: 'criadorId', as: 'criador' });

export default Auditoria;
