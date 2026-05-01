module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Stops', [
      { name: 'High St / Market', latitude: 37.78825, longitude: -122.4324, createdAt: new Date(), updatedAt: new Date() },
      { name: 'University Gate', latitude: 37.78945, longitude: -122.4301, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Stops', null, {});
  }
};
