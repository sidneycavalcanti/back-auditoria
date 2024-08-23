import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../../src/config/database.js'; // Note a extensão .js

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categoriaId: {
    type: DataTypes.INTEGER,
  },
  situacao: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
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
  tableName: 'usuario',
  timestamps: true,
  underscored: false,
  hooks: {
    beforeSave: async (usuario) => {
      if (usuario.password) {
        // Hash a senha antes de salvar no banco de dados
        usuario.password = await bcrypt.hash(usuario.password, 8);
      }
    },
  },
});

// Método para verificar a senha
Usuario.prototype.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

export default Usuario;
