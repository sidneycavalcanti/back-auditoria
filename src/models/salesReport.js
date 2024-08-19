'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SalesReport extends Model {
    static associate(models) {
      SalesReport.belongsTo(models.Audit, { foreignKey: 'auditId' });
      SalesReport.belongsTo(models.PaymentMethod, { foreignKey: 'paymentMethodId' });
    }
  }
  SalesReport.init({
    auditId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentMethodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ageRange: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'SalesReport',
  });
  return SalesReport;
};
