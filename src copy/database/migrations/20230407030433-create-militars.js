/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('militars', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      idt: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      grad: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      num: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      dtultimosv: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ultfunc: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      qtddiaf: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('militars');
  }
};
