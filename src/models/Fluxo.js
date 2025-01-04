import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Caminho ajustado para ES Modules

import Auditoria from './Auditoria.js';
import Loja from './Loja.js';

const Fluxo = sequelize.define('fluxopessoas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_loja: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_auditoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.ENUM('especulador', 'acompanhante', 'outros'),
    allowNull: false,
  },
  sexo: {
    type: DataTypes.ENUM('masculino', 'feminino'),
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'fluxopessoas',
  timestamps: true, // Mantém o controle automático de createdAt e updatedAt
  underscored: false, // Desativa a conversão automática para snake_case
});

Loja.belongsTo(Loja, { foreignKey: 'id_loja', as: 'loja' });
Auditoria.belongsTo(Auditoria, { foreignKey: 'id_auditoria', as: 'auditoria' });

export default Fluxo;
