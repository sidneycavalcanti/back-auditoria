// models/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    return User;
  };
  
  // models/audit.js
  module.exports = (sequelize, DataTypes) => {
    const Audit = sequelize.define('Audit', {
      action: {
        type: DataTypes.STRING,
        allowNull: false
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
  
    Audit.associate = (models) => {
      Audit.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Audit;
  };
  