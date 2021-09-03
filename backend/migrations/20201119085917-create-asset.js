const base = require('./base/base');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const baseFields = base.generateBaseFields(Sequelize);
    await queryInterface.createTable('Asset', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      Name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      ActiveTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      AssigneeId: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      LocationId: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      Status: {
        type: Sequelize.ENUM(['inStorage', 'inUse', 'malfunction', 'repairing', 'resaleRequired']),
        allowNull: false,
      },
      TypeId: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      SubTypeId: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      SKU: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      ...baseFields,
    });
    await base.generateBaseConstraint(queryInterface, 'Asset');
  },
  down: async (queryInterface, Sequelize) => {
    await base.generateRemoveBaseConstraint(queryInterface, 'Asset');
    await queryInterface.dropTable('Asset');
  },
};
