'use strict';

const seed = require('../seeds/varianseed')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Varians', seed, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Varians', null, {});
  }
};

// module.exports = require ()