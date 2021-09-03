module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.addColumn(
        'UsageHistory', // table name
        'HandoverContent', // new field name
        {
          type: Sequelize.TEXT,
          allowNull: true,
          field: 'HandoverContent',
        },
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.removeColumn('UsageHistory', 'HandoverContent'),
    ]);
  },
};
