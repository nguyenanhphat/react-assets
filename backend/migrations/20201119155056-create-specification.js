const base = require('./base/base');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const baseFields = base.generateBaseFields(Sequelize);
    await queryInterface.createTable('Specification', {
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
      Model: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      SerialNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      ManufacturerId: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      UUID: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      WarrantyPeriod: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      TechnicalSpecification: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ...baseFields,
    });
    await base.generateBaseConstraint(queryInterface, 'Specification');
  },
  down: async (queryInterface, Sequelize) => {
    await base.generateRemoveBaseConstraint(queryInterface, 'Specification');
    await queryInterface.dropTable('Specification');
  },
};
