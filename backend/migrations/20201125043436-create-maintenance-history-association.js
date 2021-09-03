module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('MaintenanceHistory', {
      fields: ['AssetId'],
      type: 'foreign key',
      name: 'FK_MaintenanceHistory_Asset_AssetId', // useful if using queryInterface.removeConstraint
      references: {
        table: 'Asset',
        field: 'Id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
    await queryInterface.addConstraint('MaintenanceHistory', {
      fields: ['CostCurrencyUnitId'],
      type: 'foreign key',
      name: 'FK_MaintenanceHistory_GenericOption_CostCurrencyUnitId', // useful if using queryInterface.removeConstraint
      references: {
        table: 'GenericOption',
        field: 'Id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('MaintenanceHistory', 'FK_MaintenanceHistory_Asset_AssetId');
    await queryInterface.removeConstraint('MaintenanceHistory', 'FK_MaintenanceHistory_GenericOption_CostCurrencyUnitId');
  },
};
