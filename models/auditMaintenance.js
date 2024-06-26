'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuditMaintenance extends Model {
    static associate(models) {
      // define association here
    }
  }
  AuditMaintenance.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'AuditMaintenance',
  });
  return AuditMaintenance;
};
