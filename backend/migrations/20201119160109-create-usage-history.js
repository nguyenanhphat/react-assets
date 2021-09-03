const base = require('./base/base');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const baseFields = base.generateBaseFields(Sequelize);
    await queryInterface.createTable('UsageHistory', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      AssetId: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      AssigneeId: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      AssignerId: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      LocationId: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      UsageFrom: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      UsageTo: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      ...baseFields,
    });
    await base.generateBaseConstraint(queryInterface, 'UsageHistory');
  },
  down: async (queryInterface, Sequelize) => {
    await base.generateRemoveBaseConstraint(queryInterface, 'UsageHistory');
    await queryInterface.dropTable('UsageHistory');
  },
};
