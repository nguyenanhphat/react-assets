import { lowerFirst, pick } from 'lodash';
import BaseDomain from './base';
export class AssetDomain extends BaseDomain {
  constructor(data) {
    super(data);
    Object.assign(
      this,
      pick(data, [
        'Id',
        'Name',
        'ActiveTime',
        'AssigneeId',
        'LocationId',
        'Status',
        'TypeId',
        'SubTypeId',
        'ManufacturerId',
        'SKU',
      ]),
    );
    for (const prop in this) {
      if (this.hasOwnProperty(prop)) {
        this[lowerFirst(prop)] = this[prop];
      }
    }
  }
}
