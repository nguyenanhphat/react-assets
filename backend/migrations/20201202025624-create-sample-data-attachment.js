module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Attachment', [
      {
        Id: Sequelize.literal('1'),
        EntityId: 1, // asset id 1
        AttachmentLink: 'https://i.picsum.photos/id/240/200/300.jpg?hmac=oqwZqcYrZ2nqhtDKiob6qVc3u_vuKLh89nVzKs_jnNg',
        Type: 'photo',
        EntityType: 'asset',
        Name: 'Photo.jpg',
      },
    ], {}, {
      Id: {
        autoIncrement: true,
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('Attachment', { Id: [1] });
  },
};
