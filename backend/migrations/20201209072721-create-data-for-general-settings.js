module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('GeneralSetting', [
      {
        KeySetting: 'assignees',
        ValueSetting: '[]',
      },
      {
        KeySetting: 'types',
        ValueSetting: '[]',
      },
      {
        KeySetting: 'subTypes',
        ValueSetting: '[]',
      },
      {
        KeySetting: 'routineDates',
        ValueSetting: '[]',
      },
      {
        KeySetting: 'statuses',
        ValueSetting: '[]',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('GeneralSetting', { KeySetting: ['assignees', 'types', 'subTypes', 'routineDates', 'statuses'] });
  },
};
