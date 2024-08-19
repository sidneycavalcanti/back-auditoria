'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('servicos', 'rancho_id', {
    
      type: Sequelize.INTEGER,
      references: { model: "militars", key: "id" },
    });

    await queryInterface.addColumn('servicos', 'auxrancho1_id', {
  
      type: Sequelize.INTEGER,
      references: { model: "militars", key: "id" },
    });

    await queryInterface.addColumn('servicos', 'auxrancho2_id', {
  
      type: Sequelize.INTEGER,
      references: { model: "militars", key: "id" },
    });

    await queryInterface.addColumn('servicos', 'auxrancho3_id', {
  
      type: Sequelize.INTEGER,
      references: { model: "militars", key: "id" },
    });

    await queryInterface.addColumn('servicos', 'pavsup1_id', {
  
      type: Sequelize.INTEGER,
      references: { model: "militars", key: "id" },
    });

    await queryInterface.addColumn('servicos', 'pavsup2_id', {
  
      type: Sequelize.INTEGER,
      references: { model: "militars", key: "id" },
    });

    await queryInterface.addColumn('servicos', 'armeiro_id', {
  
      type: Sequelize.INTEGER,
      references: { model: "militars", key: "id" },
    });

    await queryInterface.addColumn('servicos', 'patrulha', {
  
      type: Sequelize.STRING,

    });

    await queryInterface.addColumn('servicos', 'instrucao', {
  
      type: Sequelize.STRING,
     
    });

    await queryInterface.addColumn('servicos', 'geraladm', {
  
      type: Sequelize.STRING,
     
    });

    await queryInterface.addColumn('servicos', 'jusdis', {
  
      type: Sequelize.STRING,
     
    });
  },
  async down (queryInterface, Sequelize) {
 
  }
};
