import { STRING, ENUM, BIGINT } from 'sequelize';
import { BaseModel } from './base';
import { GENERIC_OPTION } from '../constants/modelEmun';

export class GenericOption extends BaseModel {
  static init(sequelize) {
    const groups = Object.values(GENERIC_OPTION.group);
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: BIGINT,
        field: 'Id',
      },
      name: {
        type: STRING(50),
        allowNull: false,
        field: 'Name',
      },
      group: {
        type: ENUM(...groups),
        allowNull: false,
        field: 'Group',
      },
      parentId: {
        type: BIGINT,
        allowNull: true,
        field: 'ParentId',
      },
      googleDriveFolderId: {
        type: STRING(50),
        allowNull: true,
        field: 'GoogleDriveFolderId',
      },
      ...this.baseFields,
    }, {
      sequelize,
      timestamps: false,
      tableName: 'GenericOption',
      modelName: 'GenericOption',
      freezeTableName: true,
    });
  }

  static associate(models) {
    this.associateBaseFields(models);
    this.belongsTo(models.GenericOption, { as: 'parent', foreignKey: 'ParentId' });
  }
}
