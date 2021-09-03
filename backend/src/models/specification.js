import { DATE, BIGINT, TEXT, STRING } from 'sequelize';
import { BaseModel } from './base';

export class Specification extends BaseModel {
  static init(sequelize) {
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
      model: {
        type: STRING(50),
        allowNull: false,
        field: 'Model',
      },
      serialNumber: {
        type: STRING(50),
        allowNull: false,
        field: 'SerialNumber',
      },
      manufacturerId: {
        type: BIGINT,
        allowNull: true,
        field: 'ManufacturerId',
      },
      uuid: {
        type: STRING(50),
        allowNull: false,
        field: 'UUID',
      },
      warrantyPeriod: {
        type: DATE,
        allowNull: false,
        field: 'WarrantyPeriod',
      },
      technicalSpecification: {
        type: TEXT,
        allowNull: true,
        field: 'TechnicalSpecification',
      },
      ...this.baseFields,
    }, {
      sequelize,
      timestamps: false,
      tableName: 'Specification',
      modelName: 'Specification',
      freezeTableName: true,
    });
  }

  static associate(models) {
    this.associateBaseFields(models);
    this.belongsTo(models.GenericOption, { as: 'manufacturer', foreignKey: 'ManufacturerId' });
    this.belongsTo(models.Asset, { as: 'asset', foreignKey: 'AssetId' });
  }
}
