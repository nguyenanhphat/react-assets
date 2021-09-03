import { BIGINT, STRING, ENUM } from 'sequelize';
import { BaseModel } from './base';
import { ATTACHMENT } from '../constants/modelEmun';

export class Attachment extends BaseModel {
  static init(sequelize) {
    const entityTypes = Object.values(ATTACHMENT.entityType);
    const type = Object.values(ATTACHMENT.type);
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: BIGINT,
        field: 'Id',
      },
      entityId: {
        type: BIGINT,
        allowNull: true,
        field: 'EntityId',
      },
      attachmentLink: {
        type: STRING,
        allowNull: false,
        field: 'AttachmentLink',
      },
      type: {
        type: ENUM(...type),
        allowNull: true,
        field: 'Type',
      },
      entityType: {
        type: ENUM(...entityTypes),
        allowNull: true,
        field: 'EntityType',
      },
      name: {
        type: STRING,
        allowNull: false,
        field: 'Name',
      },
      ...this.baseFields,
    }, {
      sequelize,
      timestamps: false,
      tableName: 'Attachment',
      modelName: 'Attachment',
      freezeTableName: true,
    });
  }

  static associate(models) {
    this.associateBaseFields(models);
    this.belongsTo(models.Asset, { as: 'asset', foreignKey: 'EntityId' });
    this.belongsTo(models.UsageHistory, { as: 'usageHistory', foreignKey: 'EntityId' });
  }
}
