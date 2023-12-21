'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn('Recipes', 'status', {type: Sequelize.STRING, defaultValue: "unavailable"});
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.removeColumn('Recipes', 'status');
  }
};
