module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.addColumn(
        'User', // table name
        'GoogleDrivePermissionId', // new field name
        {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
      ),
    ]);
  },

  down: async queryInterface => {
    await Promise.all([
      queryInterface.removeColumn('User', 'GoogleDrivePermissionId'),
    ]);
  },
};
