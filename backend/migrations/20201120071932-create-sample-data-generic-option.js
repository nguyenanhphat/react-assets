module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('GenericOption', [
      {
        Id: Sequelize.literal('1'),
        Name: 'Software',
        Group: 'type',
      },
      {
        Id: Sequelize.literal('2'),
        Name: 'Hardware',
        Group: 'type',
      },
      {
        Id: Sequelize.literal('3'),
        Name: 'Facilities',
        Group: 'type',
      },
      {
        Id: Sequelize.literal('4'),
        Name: 'Windows',
        Group: 'subType',
        ParentId: 1,
      },
      {
        Id: Sequelize.literal('5'),
        Name: 'Google',
        Group: 'subType',
        ParentId: 1,
      },
      {
        Id: Sequelize.literal('6'),
        Name: 'Desktop',
        Group: 'subType',
        ParentId: 2,
      },
      {
        Id: Sequelize.literal('7'),
        Name: 'Laptop',
        Group: 'subType',
        ParentId: 2,
      },
      {
        Id: Sequelize.literal('8'),
        Name: 'TV',
        Group: 'subType',
        ParentId: 3,
      },
      {
        Id: Sequelize.literal('9'),
        Name: 'Speaker',
        Group: 'subType',
        ParentId: 3,
      },
      {
        Id: Sequelize.literal('10'),
        Name: 'HCM',
        Group: 'location',
      },
      {
        Id: Sequelize.literal('11'),
        Name: 'DN',
        Group: 'location',
      },
      {
        Id: Sequelize.literal('12'),
        Name: 'VND',
        Group: 'currencyUnit',
      },
      {
        Id: Sequelize.literal('13'),
        Name: 'Sample',
        Group: 'manufacturer',
      },
    ], {}, {
      Id: {
        autoIncrement: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('GenericOption', { Id: [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1] });
  },
};
