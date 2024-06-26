'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EvaluationType extends Model {
    static associate(models) {
      // define association here
    }
  }
  EvaluationType.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'EvaluationType',
  });
  return EvaluationType;
};
