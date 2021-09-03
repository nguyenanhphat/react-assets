import { DATE, BIGINT, FLOAT, TEXT } from 'sequelize';
import { BaseModel } from './base';

export class MaintenanceHistory extends BaseModel {
  static init(sequelize) {
    return super.init({
      assetId: {
        type: BIGINT,
        allowNull: false,
        field: 'AssetId',
      },
      cost: {
        type: FLOAT,
        allowNull: true,
        field: 'Cost',
      },
      costCurrencyUnitId: {
        type: BIGINT,
        allowNull: true,
        field: 'CostCurrencyUnitId',
      },
      issueDate: {
        type: DATE,
        allowNull: false,
        field: 'IssueDate',
      },
      completedDate: {
        type: DATE,
        allowNull: true,
        field: 'CompletedDate',
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
      details: {
        type: TEXT,
        allowNull: true,
        field: 'Details',
      },
      ...this.baseFields,
    }, {
      sequelize,
      timestamps: false,
      tableName: 'MaintenanceHistory',
      modelName: 'MaintenanceHistory',
      freezeTableName: true,
    });
  }

  static associate(models) {
    this.associateBaseFields(models);
    this.belongsTo(models.Asset, { as: 'asset', foreignKey: 'AssetId' });
    this.belongsTo(models.GenericOption, { as: 'costCurrencyUnit', foreignKey: 'CostCurrencyUnitId' });
  }
}
