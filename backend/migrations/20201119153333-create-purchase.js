const base = require('./base/base');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const baseFields = base.generateBaseFields(Sequelize);
    await queryInterface.createTable('Purchase', {
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
      PurchaserId: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      State: {
        type: Sequelize.ENUM(['new', 'old']),
        allowNull: false,
      },
      Time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      Cost: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      CostCurrencyUnitId: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      SupplierContractId: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      SupplierId: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      UUID: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      ...baseFields,
    });
    await base.generateBaseConstraint(queryInterface, 'Purchase');
  },
  down: async (queryInterface, Sequelize) => {
    await base.generateRemoveBaseConstraint(queryInterface, 'Purchase');
    await queryInterface.dropTable('Purchase');
  },
};
