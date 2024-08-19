'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AuditAssignment extends Model {
    static associate(models) {
      AuditAssignment.belongsTo(models.Store, { foreignKey: 'storeId' });
      AuditAssignment.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  AuditAssignment.init({
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Stores',
        key: 'id'
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
    },
    auditDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'AuditAssignment',
  });
  return AuditAssignment;
};
