import { STRING, DATE, BIGINT, ENUM, FLOAT } from 'sequelize';
import { BaseModel } from './base';
import { ASSET } from '../constants/modelEmun';

export class Asset extends BaseModel {
  static init(sequelize) {
    const statuses = Object.values(ASSET.status);
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
      activeTime: {
        type: DATE,
        allowNull: true,
        field: 'ActiveTime',
      },
      assigneeId: {
        type: BIGINT,
        allowNull: true,
        field: 'AssigneeId',
      },
      locationId: {
        type: BIGINT,
        allowNull: true,
        field: 'LocationId',
      },
      status: {
        type: ENUM(...statuses),
        allowNull: false,
        defaultValue: 'inStorage',
        field: 'Status',
      },
      typeId: {
        type: BIGINT,
        allowNull: false,
        field: 'TypeId',
      },
      currentValue: {
        type: FLOAT,
        allowNull: true,
        field: 'CurrentValue',
        defaultValue: 0,
      },
      currentValueCurrencyUnitId: {
        type: BIGINT,
        allowNull: true,
        field: 'CurrentValueCurrencyUnitId',
      },
      subTypeId: {
        type: BIGINT,
        allowNull: true,
        field: 'SubTypeId',
      },
      sku: {
        type: STRING(50),
        allowNull: true,
        field: 'SKU',
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
      tableName: 'Asset',
      modelName: 'Asset',
      freezeTableName: true,
    });
  }

  static associate(models) {
    this.associateBaseFields(models);
    this.hasOne(models.Purchase, { as: 'purchase', foreignKey: 'AssetId' });
    this.hasOne(models.Specification, { as: 'specification', foreignKey: 'AssetId' });
    this.belongsTo(models.User, { as: 'assignee', foreignKey: 'AssigneeId' });
    this.belongsTo(models.GenericOption, { as: 'location', foreignKey: 'LocationId' });
    this.belongsTo(models.GenericOption, { as: 'type', foreignKey: 'TypeId' });
    this.belongsTo(models.GenericOption, { as: 'subType', foreignKey: 'SubTypeId' });
    this.belongsTo(models.GenericOption, { as: 'currentValueCurrencyUnit', foreignKey: 'CurrentValueCurrencyUnitId' });
    this.hasMany(models.Attachment, { as: 'attachments', foreignKey: 'EntityId' });
    this.hasMany(models.UsageHistory, { as: 'usageHistories', foreignKey: 'AssetId' });
  }
}
