'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
  }, {});
  User.associate = function(models) {
    User.belongsTo(models.Category, {foreignKey: 'categoryId'});
  };
  return User;
};
