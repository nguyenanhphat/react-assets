import { BIGINT, ENUM, DATE, FLOAT, STRING } from 'sequelize';
import { BaseModel } from './base';
import { PURCHASE } from '../constants/modelEmun';

export class Purchase extends BaseModel {
  static init(sequelize) {
    const states = Object.values(PURCHASE.state);
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
      purchaserId: {
        type: BIGINT,
        allowNull: true,
        field: 'PurchaserId',
      },
      state: {
        type: ENUM(...states),
        allowNull: false,
        field: 'State',
        defaultValue: 'new',
      },
      time: {
        type: DATE,
        allowNull: false,
        field: 'Time',
      },
      cost: {
        type: FLOAT,
        allowNull: false,
        field: 'Cost',
      },
      costCurrencyUnitId: {
        type: BIGINT,
        allowNull: false,
        field: 'CostCurrencyUnitId',
      },
      supplierContractId: {
        type: BIGINT,
        allowNull: true,
        field: 'SupplierContractId',
      },
      supplierId: {
        type: BIGINT,
        allowNull: true,
        field: 'SupplierId',
      },
      uuid: {
        type: STRING(50),
        allowNull: true,
        field: 'UUID',
      },
      ...this.baseFields,
    }, {
      sequelize,
      timestamps: false,
      tableName: 'Purchase',
      modelName: 'Purchase',
      freezeTableName: true,
    });
  }

  static associate(models) {
    this.associateBaseFields(models);
    this.belongsTo(models.Asset, { as: 'asset', foreignKey: 'AssetId' });
    this.belongsTo(models.User, { as: 'purchaser', foreignKey: 'PurchaserId' });
    this.belongsTo(models.GenericOption, { as: 'costCurrencyUnit', foreignKey: 'CostCurrencyUnitId' });
  }
}
