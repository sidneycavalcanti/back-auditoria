'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Flow extends Model {
    static associate(models) {
      Flow.belongsTo(models.Audit, { foreignKey: 'auditId' });
    }
  }
  Flow.init({
    auditId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qtdMaleSpeculator: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qtdFemaleSpeculator: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qtdMaleCompanion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qtdFemaleCompanion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qtdOtherMale: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qtdOtherFemale: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Flow',
  });
  return Flow;
};
