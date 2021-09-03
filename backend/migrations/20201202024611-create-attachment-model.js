const base = require('./base/base');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const baseFields = base.generateBaseFields(Sequelize);
    await queryInterface.createTable('Attachment', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      EntityId: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      AttachmentLink: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Type: {
        type: Sequelize.ENUM(['photo', 'attachment']),
        allowNull: true,
      },
      EntityType: {
        type: Sequelize.ENUM(['asset', 'usageHistory']),
        allowNull: true,
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ...baseFields,
    });
    await base.generateBaseConstraint(queryInterface, 'Attachment');
  },
  down: async queryInterface => {
    await base.generateRemoveBaseConstraint(queryInterface, 'Attachment');
    await queryInterface.dropTable('Attachment');
  },
};
