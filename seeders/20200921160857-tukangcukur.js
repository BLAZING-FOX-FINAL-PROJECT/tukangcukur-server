'use strict';

const seed = require('../seeds/tukangcukurseed')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('TukangCukurs', seed, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TukangCukurs', null, {});
  }
};
