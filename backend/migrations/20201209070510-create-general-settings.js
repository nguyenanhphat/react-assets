const base = require('./base/base');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const baseFields = base.generateBaseFields(Sequelize);
    await queryInterface.createTable('GeneralSetting', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      KeySetting: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      ValueSetting: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ...baseFields,
    });
    await base.generateBaseConstraint(queryInterface, 'GeneralSetting');
  },
  down: async (queryInterface, Sequelize) => {
    await base.generateRemoveBaseConstraint(queryInterface, 'GeneralSetting');
    await queryInterface.dropTable('GeneralSetting');
  },
};
