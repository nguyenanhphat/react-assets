import { STRING, TEXT, BIGINT } from 'sequelize';
import { BaseModel } from './base';

export class GeneralSetting extends BaseModel {
  static init(sequelize) {
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: BIGINT,
        field: 'Id',
      },
      keySetting: {
        type: STRING,
        allowNull: false,
        unique: true,
        field: 'KeySetting',
      },
      valueSetting: {
        type: TEXT,
        field: 'ValueSetting',
      },
      ...this.baseFields,
    }, {
      sequelize,
      timestamps: false,
      tableName: 'GeneralSetting',
      modelName: 'GeneralSetting',
      freezeTableName: true,
    });
  }

  static associate(models) {
    this.associateBaseFields(models);
  }
}
