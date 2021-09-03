import { STRING, fn, BOOLEAN, DATE, BIGINT } from 'sequelize';
import { BaseModel } from './base';

export class User extends BaseModel {
  static init(sequelize) {
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: BIGINT,
        field: 'Id',
      },
      empCode: {
        type: STRING(50),
        unique: true,
        allowNull: false,
        field: 'EmpCode',
      },
      firstName: {
        type: STRING(50),
        field: 'FirstName',
      },
      lastName: {
        type: STRING(50),
        field: 'LastName',
      },
      email: {
        type: STRING(50),
        unique: true,
        field: 'Email',
      },
      googleDrivePermissionId: {
        type: STRING(50),
        field: 'GoogleDrivePermissionId',
      },
      isActive: {
        type: BOOLEAN,
        allowNull: false,
        field: 'IsActive',
      },
      lastSyncDate: {
        type: DATE,
        allowNull: true,
        defaultValue: fn('GETDATE'),
        field: 'LastSyncDate',
      },
      ...this.baseFields,
    }, {
      sequelize,
      timestamps: false,
      tableName: 'User',
      modelName: 'User',
      freezeTableName: true,
    });
  }

  static associate(models) {
    this.associateBaseFields(models);
  }
}
