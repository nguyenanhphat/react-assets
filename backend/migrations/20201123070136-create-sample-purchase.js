module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Purchase', [
      {
        Id: Sequelize.literal('1'),
        AssetId: 1,
        PurchaserId: 1,
        State: 'new',
        Time: Sequelize.fn('GETDATE'),
        Cost: 1000000,
        CostCurrencyUnitId: 3,
      },
    ], {}, {
      Id: {
        autoIncrement: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Purchase', { Id: [1] });
  },
};
