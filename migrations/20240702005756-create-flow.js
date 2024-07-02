'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      auditId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Audits',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      qtdMaleSpeculator: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      qtdFemaleSpeculator: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      qtdMaleCompanion: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      qtdFemaleCompanion: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      qtdOtherMale: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      qtdOtherFemale: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Flows');
  }
};
