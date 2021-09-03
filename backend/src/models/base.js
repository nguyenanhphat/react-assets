import { Model, BIGINT, DATE, BOOLEAN, fn } from 'sequelize';

export class BaseModel extends Model {
    static baseFields = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: BIGINT,
        field: 'Id',
      },
      creationTime: {
        type: DATE,
        allowNull: false,
        defaultValue: fn('GETDATE'),
        field: 'CreationTime',
      },
      creatorUserId: {
        type: BIGINT,
        allowNull: true,
        field: 'CreatorUserId',
      },
      lastModificationTime: {
        type: DATE,
        allowNull: true,
        defaultValue: fn('GETDATE'),
        field: 'LastModificationTime',
      },
      lastModifierUserId: {
        type: BIGINT,
        allowNull: true,
        field: 'LastModifierUserId',
      },
      isDeleted: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'IsDeleted',
      },
      deleterUserId: {
        type: DATE,
        allowNull: true,
        field: 'DeleterUserId',
      },
      deletionTime: {
        type: DATE,
        allowNull: true,
        field: 'DeletionTime',
      },
    };

    static associateBaseFields(models) {
      this.belongsTo(models.User, {
        as: 'creatorUser',
        foreignKey: {
          name: 'CreatorUserId',
          allowNull: true,
        },
      });
      this.belongsTo(models.User, {
        as: 'lastModifierUser',
        foreignKey: {
          name: 'LastModifierUserId',
          allowNull: true,
        },
      });
      this.belongsTo(models.User, {
        as: 'deleterUser',
        foreignKey: {
          name: 'DeleterUserId',
          allowNull: true,
        },
      });
    }
}
