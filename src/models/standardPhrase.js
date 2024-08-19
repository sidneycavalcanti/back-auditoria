'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StandardPhrase extends Model {
    static associate(models) {
      // define association here
    }
  }
  StandardPhrase.init({
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'StandardPhrase',
  });
  return StandardPhrase;
};
