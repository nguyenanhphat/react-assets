import { pick } from 'lodash';
import BaseDTO from './base';
import AssetDTO from './asset/asset';
import GenericOptionDTO from './genericOption';

export default class MaintenanceHistoryDTO extends BaseDTO {
  constructor(data) {
    super(data);
    Object.assign(
      this,
      pick(data, [
        'id',
        'assetId',
        'asset',
        'cost',
        'costCurrencyUnitId',
        'costCurrencyUnit',
        'issueDate',
        'completedDate',
        'supplierContractId',
        'supplierId',
        'details',
      ]),
    );
  }

  toJSON() {
    const jsonObj = {};
    Object.assign(
      jsonObj,
      pick(this, [
        'id',
        'asset',
        'cost',
        'costCurrencyUnit',
        'issueDate',
        'completedDate',
        'supplierContractId',
        'supplierId',
        'details',
      ]),
    );
    jsonObj.asset = this.asset ? new AssetDTO(this.asset).toJSON() : null;
    jsonObj.costCurrencyUnit = this.costCurrencyUnit ? new GenericOptionDTO(this.costCurrencyUnit).toJSON() : null;
    return jsonObj;
  }
}
