'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CauseLoss extends Model {
    static associate(models) {
      // define association here
    }
  }
  CauseLoss.init({
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'CauseLoss',
  });
  return CauseLoss;
};
