'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Loss extends Model {
    static associate(models) {
      Loss.belongsTo(models.Audit, { foreignKey: 'auditId' });
      Loss.belongsTo(models.CauseLoss, { foreignKey: 'causeLossId' });
    }
  }
  Loss.init({
    auditId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    causeLossId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Loss',
  });
  return Loss;
};
