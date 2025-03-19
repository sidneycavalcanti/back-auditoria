import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Cadavoperacional from './Cadavoperacional.js';

const Cadquestoes = sequelize.define('Cadquestoes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cadavoperacionalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cadavoperacional, // Referência ao modelo importado
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  situacao: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'cadquestoes',
  timestamps: true, // O Sequelize gerencia createdAt e updatedAt automaticamente
  underscored: false, // Mantém os nomes dos campos conforme definidos
});

// Associação: Cadquestoes pertence a Cadavoperacional
Cadquestoes.belongsTo(Cadavoperacional, { foreignKey: 'cadavoperacionalId', as: 'cadavoperacional' });

export default Cadquestoes;
