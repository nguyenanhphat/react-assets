module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('GenericOption', {
      fields: ['ParentId'],
      type: 'foreign key',
      name: 'FK_GenericOption_GenericOption_ParentId', // useful if using queryInterface.removeConstraint
      references: {
        table: 'GenericOption',
        field: 'Id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('GenericOption', 'FK_GenericOption_GenericOption_ParentId');
  },
};
