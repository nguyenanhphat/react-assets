module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('User', [
      {
        EmpCode: 'khoa.nguyen',
        FirstName: 'Khoa',
        LastName: 'Nguyen',
        Email: 'khoa.nguyen@saigontechnology.com',
        IsActive: true,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User', { EmpCode: ['khoa.nguyen'] });
  },
};
