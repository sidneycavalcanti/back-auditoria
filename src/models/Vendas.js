import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Caminho ajustado para ES Modules
import Auditoria from './Auditoria.js';
import Formadepagamento from './Formadepagamento.js';
import Sexo from './Cadsexo.js';


const Vendas = sequelize.define('Vendas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  auditoriaId: {
    type: DataTypes.INTEGER,
    allowNull: false, // É obrigatório, pois vincula à auditoria
    references: {
      model: 'Auditoria',
      key: 'id',
    },
  },
  formadepagamentoId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Relacionado à forma de pagamento
  },
  sexoId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Relacionado ao sexo
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true, // Valida se o valor é decimal
      min: 0, // Não permite valores negativos
    },
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
  tableName: 'vendas',
  timestamps: true,
});

// Relacionamentos
Vendas.belongsTo(Auditoria, { foreignKey: 'auditoriaId', as: 'auditoria' });
Vendas.belongsTo(Formadepagamento, { foreignKey: 'formadepagamentoId', as: 'formadepagamento' });
Vendas.belongsTo(Sexo, { foreignKey: 'sexoId', as: 'sexo' });

export default Vendas;
