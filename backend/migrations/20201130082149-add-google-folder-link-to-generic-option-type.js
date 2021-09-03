module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.addColumn(
        'GenericOption', // table name
        'GoogleDriveFolderId', // new field name
        {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
      ),
    ]);
  },

  down: async queryInterface => {
    await Promise.all([
      queryInterface.removeColumn('GenericOption', 'GoogleDriveFolderId'),
    ]);
  },
};
