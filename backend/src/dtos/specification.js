import { pick } from 'lodash';
import BaseDTO from './base';
import GenericOptionDTO from './genericOption';

export default class SpecificationDTO extends BaseDTO {
  constructor(data) {
    super(data);
    Object.assign(
      this,
      pick(data, [
        'id',
        'assetId',
        'model',
        'serialNumber',
        'manufacturerId',
        'uuid',
        'warrantyPeriod',
        'technicalSpecification',
        'manufacturer',
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
        'model',
        'serialNumber',
        'manufacturerId',
        'uuid',
        'warrantyPeriod',
        'technicalSpecification',
      ]),
    );
    jsonObj.manufacturer = this.manufacturer ? new GenericOptionDTO(this.manufacturer).toJSON() : null;
    return jsonObj;
  }
}
