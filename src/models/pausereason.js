'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PauseReason extends Model {
    static associate(models) {
      // define association here
    }
  }
  PauseReason.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'PauseReason',
  });
  return PauseReason;
};
