module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Purchase', {
      fields: ['AssetId'],
      type: 'foreign key',
      name: 'FK_Purchase_Asset_AssetId', // useful if using queryInterface.removeConstraint
      references: {
        table: 'Asset',
        field: 'Id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
    await queryInterface.addConstraint('Purchase', {
      fields: ['PurchaserId'],
      type: 'foreign key',
      name: 'FK_Purchase_User_PurchaserId', // useful if using queryInterface.removeConstraint
      references: {
        table: 'User',
        field: 'Id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
    await queryInterface.addConstraint('Purchase', {
      fields: ['CostCurrencyUnitId'],
      type: 'foreign key',
      name: 'FK_Purchase_GenericOption_CostCurrencyUnitId', // useful if using queryInterface.removeConstraint
      references: {
        table: 'GenericOption',
        field: 'Id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Purchase', 'FK_Purchase_Asset_AssetId');
    await queryInterface.removeConstraint('Purchase', 'FK_Purchase_User_PurchaserId');
    await queryInterface.removeConstraint('Purchase', 'FK_Purchase_GenericOption_CostCurrencyUnitId');
  },
};
