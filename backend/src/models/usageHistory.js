import { BIGINT, DATE, TEXT, ENUM } from 'sequelize';
import { BaseModel } from './base';
import { USAGE_HISTORY } from '../constants/modelEmun';

export class UsageHistory extends BaseModel {
  static init(sequelize) {
    const statuses = Object.values(USAGE_HISTORY.status);
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: BIGINT,
        field: 'Id',
      },
      assetId: {
        type: BIGINT,
        allowNull: false,
        field: 'AssetId',
      },
      assigneeId: {
        type: BIGINT,
        allowNull: false,
        field: 'AssigneeId',
      },
      assignerId: {
        type: BIGINT,
        allowNull: true,
        field: 'AssignerId',
      },
      locationId: {
        type: BIGINT,
        allowNull: false,
        field: 'LocationId',
      },
      usageFrom: {
        type: DATE,
        allowNull: false,
        field: 'UsageFrom',
      },
      usageTo: {
        type: DATE,
        allowNull: true,
        field: 'UsageTo',
      },
      handoverContent: {
        type: TEXT,
        allowNull: true,
        field: 'HandoverContent',
      },
      status: {
        type: ENUM(...statuses),
        allowNull: true,
        defaultValue: USAGE_HISTORY.status.inUse,
        field: 'Status',
      },
      ...this.baseFields,
    }, {
      sequelize,
      timestamps: false,
      tableName: 'UsageHistory',
      modelName: 'UsageHistory',
      freezeTableName: true,
    });
  }

  static associate(models) {
    this.associateBaseFields(models);
    this.belongsTo(models.Asset, { as: 'asset', foreignKey: 'AssetId' });
    this.belongsTo(models.User, { as: 'assignee', foreignKey: 'AssigneeId' });
    this.belongsTo(models.User, { as: 'assigner', foreignKey: 'AssignerId' });
    this.belongsTo(models.GenericOption, { as: 'location', foreignKey: 'LocationId' });
    this.hasMany(models.Attachment, { as: 'handoverDocuments', foreignKey: 'EntityId' });
  }
}
