module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Asset', {
      fields: ['AssigneeId'],
      type: 'foreign key',
      name: 'FK_Asset_User_AssigneeId', // useful if using queryInterface.removeConstraint
      references: {
        table: 'User',
        field: 'Id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
    await queryInterface.addConstraint('Asset', {
      fields: ['LocationId'],
      type: 'foreign key',
      name: 'FK_Asset_GenericOption_LocationId', // useful if using queryInterface.removeConstraint
      references: {
        table: 'GenericOption',
        field: 'Id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
    await queryInterface.addConstraint('Asset', {
      fields: ['TypeId'],
      type: 'foreign key',
      name: 'FK_Asset_GenericOption_TypeId', // useful if using queryInterface.removeConstraint
      references: {
        table: 'GenericOption',
        field: 'Id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
    await queryInterface.addConstraint('Asset', {
      fields: ['SubTypeId'],
      type: 'foreign key',
      name: 'FK_Asset_GenericOption_SubTypeId', // useful if using queryInterface.removeConstraint
      references: {
        table: 'GenericOption',
        field: 'Id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Asset', 'FK_Asset_User_AssigneeId');
    await queryInterface.removeConstraint('Asset', 'FK_Asset_GenericOption_LocationId');
    await queryInterface.removeConstraint('Asset', 'FK_Asset_GenericOption_TypeId');
    await queryInterface.removeConstraint('Asset', 'FK_Asset_GenericOption_SubTypeId');
  },
};
