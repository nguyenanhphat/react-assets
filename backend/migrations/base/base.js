const generateBaseConstraint = async (queryInterface, tableName) => {
  await queryInterface.addConstraint(tableName, {
    fields: ['CreatorUserId'],
    type: 'foreign key',
    name: `FK_${tableName}_User_CreatorUserId`, // useful if using queryInterface.removeConstraint
    references: {
      table: 'User',
      field: 'Id',
    },
    onDelete: 'no action',
    onUpdate: 'no action',
  });
  await queryInterface.addConstraint(tableName, {
    fields: ['LastModifierUserId'],
    type: 'foreign key',
    name: `FK_${tableName}_User_LastModifierUserId`, // useful if using queryInterface.removeConstraint
    references: {
      table: 'User',
      field: 'Id',
    },
    onDelete: 'no action',
    onUpdate: 'no action',
  });
  await queryInterface.addConstraint(tableName, {
    fields: ['DeleterUserId'],
    type: 'foreign key',
    name: `FK_${tableName}_User_DeleterUserId`, // useful if using queryInterface.removeConstraint
    references: {
      table: 'User',
      field: 'Id',
    },
    onDelete: 'no action',
    onUpdate: 'no action',
  });
};
const generateRemoveBaseConstraint = async (queryInterface, tableName) => {
  await queryInterface.removeConstraint(tableName, `FK_${tableName}_User_CreatorUserId`);
  await queryInterface.removeConstraint(tableName, `FK_${tableName}_User_LastModifierUserId`);
  await queryInterface.removeConstraint(tableName, `FK_${tableName}_User_DeleterUserId`);
};
const generateBaseFields = Sequelize => ({
  CreationTime: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('GETDATE'),
  },
  CreatorUserId: {
    type: Sequelize.BIGINT,
    allowNull: true,
  },
  LastModificationTime: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: Sequelize.fn('GETDATE'),
  },
  LastModifierUserId: {
    type: Sequelize.BIGINT,
    allowNull: true,
  },
  IsDeleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  DeleterUserId: {
    type: Sequelize.BIGINT,
    allowNull: true,
  },
  DeletionTime: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});
module.exports = { generateBaseConstraint, generateBaseFields, generateRemoveBaseConstraint };
