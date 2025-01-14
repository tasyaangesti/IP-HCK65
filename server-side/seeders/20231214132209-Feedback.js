'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const dataFeedback = require("../data/feedback.json").map((item) => {
      item.createdAt = new Date();
      item.updatedAt = new Date();

      return item;
    });
    return await queryInterface.bulkInsert("Feedbacks", dataFeedback);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete("Feedbacks", null, {});

  }
};
