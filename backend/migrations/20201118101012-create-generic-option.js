const base = require('./base/base');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const baseFields = base.generateBaseFields(Sequelize);
    await queryInterface.createTable('GenericOption', {
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
      Group: {
        type: Sequelize.ENUM(['type', 'subType', 'currencyUnit', 'manufacturer', 'location']),
        allowNull: false,
      },
      ParentId: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      ...baseFields,
    });
    await base.generateBaseConstraint(queryInterface, 'GenericOption');
  },
  down: async (queryInterface, Sequelize) => {
    await base.generateRemoveBaseConstraint(queryInterface, 'GenericOption');
    await queryInterface.dropTable('GenericOption');
  },
};
