module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('UsageHistory', {
      fields: ['AssetId'],
      type: 'foreign key',
      name: 'FK_UsageHistory_Asset_AssetId', // useful if using queryInterface.removeConstraint
      references: {
        table: 'Asset',
        field: 'Id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
    await queryInterface.addConstraint('UsageHistory', {
      fields: ['AssigneeId'],
      type: 'foreign key',
      name: 'FK_UsageHistory_User_AssigneeId', // useful if using queryInterface.removeConstraint
      references: {
        table: 'User',
        field: 'Id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
    await queryInterface.addConstraint('UsageHistory', {
      fields: ['AssignerId'],
      type: 'foreign key',
      name: 'FK_UsageHistory_User_AssignerId', // useful if using queryInterface.removeConstraint
      references: {
        table: 'User',
        field: 'Id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
    await queryInterface.addConstraint('UsageHistory', {
      fields: ['LocationId'],
      type: 'foreign key',
      name: 'FK_UsageHistory_GenericOption_LocationId', // useful if using queryInterface.removeConstraint
      references: {
        table: 'GenericOption',
        field: 'Id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('UsageHistory', 'FK_UsageHistory_Asset_AssetId');
    await queryInterface.removeConstraint('UsageHistory', 'FK_UsageHistory_User_AssigneeId');
    await queryInterface.removeConstraint('UsageHistory', 'FK_UsageHistory_User_AssignerId');
    await queryInterface.removeConstraint('UsageHistory', 'FK_UsageHistory_GenericOption_LocationId');
  },
};
