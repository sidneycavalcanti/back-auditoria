'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DocumentType extends Model {
    static associate(models) {
      // define association here
    }
  }
  DocumentType.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'DocumentType',
  });
  return DocumentType;
};
