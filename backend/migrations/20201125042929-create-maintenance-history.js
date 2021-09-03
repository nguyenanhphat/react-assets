const base = require('./base/base');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const baseFields = base.generateBaseFields(Sequelize);
    await queryInterface.createTable('MaintenanceHistory', {
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
      Cost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      CostCurrencyUnitId: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      IssueDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      CompletedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      SupplierContractId: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      SupplierId: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      Details: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ...baseFields,
    });
    await base.generateBaseConstraint(queryInterface, 'MaintenanceHistory');
  },
  down: async (queryInterface, Sequelize) => {
    await base.generateRemoveBaseConstraint(queryInterface, 'MaintenanceHistory');
    await queryInterface.dropTable('MaintenanceHistory');
  },
};
