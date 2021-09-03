module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.addColumn(
        'Asset', // table name
        'CurrentValue', // new field name
        {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Asset',
        'CurrentValueCurrencyUnitId',
        {
          type: Sequelize.BIGINT,
          allowNull: true,
        },
      ),
    ]);
    await queryInterface.addConstraint('Asset', {
      fields: ['CurrentValueCurrencyUnitId'],
      type: 'foreign key',
      name: 'FK_Asset_GenericOption_CurrentValueCurrencyUnitId', // useful if using queryInterface.removeConstraint
      references: {
        table: 'GenericOption',
        field: 'Id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Asset', 'FK_Asset_GenericOption_CurrentValueCurrencyUnitId');
    await Promise.all([
      queryInterface.removeColumn('Asset', 'CurrentValue'),
      queryInterface.removeColumn('Asset', 'CurrentValueCurrencyUnitId'),
    ]);
  },
};
