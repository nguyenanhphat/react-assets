module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Specification', [
      {
        Id: Sequelize.literal('1'),
        AssetId: 2,
        Model: 'Asus - B101AW0643',
        SerialNumber: 'RHRMH0829838484YY4',
        UUID: '2983UHD',
        WarrantyPeriod: Sequelize.fn('GETDATE'),
        TechnicalSpecification: 'abcdefghijkmn',
        ManufacturerId: 1,
      },
      {
        Id: Sequelize.literal('2'),
        AssetId: 1,
        Model: 'Asus - B101AW0643_2',
        SerialNumber: 'RHRMH0829838484YY2',
        UUID: '2983UH4',
        WarrantyPeriod: Sequelize.fn('GETDATE'),
        TechnicalSpecification: 'abcdefghijkmn_2',
        ManufacturerId: 1,
      },
    ], {}, {
      Id: {
        autoIncrement: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Specification', { Id: [1, 2] });
  },
};
