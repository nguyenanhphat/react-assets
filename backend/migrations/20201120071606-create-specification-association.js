module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Specification', {
      fields: ['AssetId'],
      type: 'foreign key',
      name: 'FK_Specification_Asset_AssetId', // useful if using queryInterface.removeConstraint
      references: {
        table: 'Asset',
        field: 'Id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
    await queryInterface.addConstraint('Specification', {
      fields: ['ManufacturerId'],
      type: 'foreign key',
      name: 'FK_Specification_GenericOption_ManufacturerId', // useful if using queryInterface.removeConstraint
      references: {
        table: 'GenericOption',
        field: 'Id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Specification', 'FK_Specification_Asset_AssetId');
    await queryInterface.removeConstraint('Specification', 'FK_Specification_GenericOption_ManufacturerId');
  },
};
