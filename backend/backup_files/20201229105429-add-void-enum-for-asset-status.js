module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('Asset', 'Status', {
      type: Sequelize.ENUM(['inStorage', 'inUse', 'malfunction', 'repairing', 'resaleRequired', 'void']),
      allowNull: false,
    }),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('Asset', 'Status', {
      type: Sequelize.ENUM(['inStorage', 'inUse', 'malfunction', 'repairing', 'resaleRequired']),
      allowNull: false,
    }),
  ]),
};
