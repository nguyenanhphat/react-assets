module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.addColumn(
        'UsageHistory', // table name
        'Status', // new field name
        {
          type: Sequelize.ENUM('inUse', 'handedOver'),
          allowNull: false,
          defaultValue: 'inUse',
          field: 'Status',
        },
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.removeColumn('UsageHistory', 'Status'),
    ]);
  },
};
