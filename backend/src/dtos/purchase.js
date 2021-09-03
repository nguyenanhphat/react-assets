import { pick } from 'lodash';
import BaseDTO from './base';
import GenericOptionDTO from './genericOption';

export default class PurchaseDTO extends BaseDTO {
  constructor(data) {
    super(data);
    Object.assign(
      this,
      pick(data, [
        'id',
        'assetId',
        'purchaserId',
        'state',
        'time',
        'cost',
        'costCurrencyUnitId',
        'supplierContractId',
        'supplierId',
        'uuid',
        'costCurrencyUnit',
      ]),
    );
  }

  toJSON() {
    const jsonObj = {};
    Object.assign(
      jsonObj,
      pick(this, [
        'id',
        'assetId',
        'purchaserId',
        'state',
        'time',
        'cost',
        'costCurrencyUnitId',
        'supplierContractId',
        'supplierId',
        'uuid',
      ]),
    );
    jsonObj.costCurrencyUnit = this.costCurrencyUnit ? new GenericOptionDTO(this.costCurrencyUnit).toJSON() : null;
    return jsonObj;
  }
}
