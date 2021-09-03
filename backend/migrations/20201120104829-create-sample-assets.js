module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Asset', [
      {
        Id: Sequelize.literal('1'),
        Name: 'Macbook 2014',
        LocationId: 10,
        Status: 'inStorage',
        TypeId: 2,
        SubTypeId: 7,
        SKU: 'sample_SKU',
      },
    ], {}, {
      Id: {
        autoIncrement: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Asset', { Id: [1] });
  },
};
