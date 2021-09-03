const base = require('./base/base');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const baseFields = base.generateBaseFields(Sequelize);
    await queryInterface.createTable('User', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      EmpCode: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      FirstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      LastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      Email: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      IsActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      LastSyncDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn('GETDATE'),
      },
      ...baseFields,
    });
    await base.generateBaseConstraint(queryInterface, 'User');
  },
  down: async (queryInterface, Sequelize) => {
    await base.generateRemoveBaseConstraint(queryInterface, 'User');
    await queryInterface.dropTable('User');
  },
};
