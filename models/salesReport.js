'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesReport extends Model {
    static associate(models) {
      // define association here
    }
  }
  SalesReport.init({
    salesAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'SalesReport',
  });
  return SalesReport;
};
