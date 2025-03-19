import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

import Auditoria from './Auditoria.js';
import Cadavoperacional from './Cadavoperacional.js';
import Cadquestoes from './Cadquestoes.js';

const Avoperacional = sequelize.define('Avoperacional', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cadavoperacionalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cadavoperacional,
      key: 'id',
    },
  },
  cadquestoesId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cadquestoes,
      key: 'id',
    },
  },
  auditoriaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Auditoria,
      key: 'id',
    },
  },
  resposta: {
    type: DataTypes.STRING,
  },
  // NOVO CAMPO: nota
  nota: {
    type: DataTypes.TINYINT, // Armazena valores de -128 a 127 ou 0 a 255 (se unsigned)
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
}, {
  tableName: 'avoperacional',
  timestamps: true,
  underscored: false,
});

// Associações
Avoperacional.belongsTo(Cadavoperacional, { foreignKey: 'cadavoperacionalId', as: 'cadavoperacional' });
Avoperacional.belongsTo(Cadquestoes,       { foreignKey: 'cadquestoesId',       as: 'cadquestoes' });
Avoperacional.belongsTo(Auditoria,        { foreignKey: 'auditoriaId',         as: 'auditoria' });

export default Avoperacional;
