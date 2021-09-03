import { pick, lowerFirst } from 'lodash';
import BaseDomain from './base';
export class UsageHistoryDomain extends BaseDomain {
  constructor(data) {
    super(data);
    Object.assign(
      this,
      pick(data, [
        'Id',
        'AssetId',
        'Asset',
        'AssigneeId',
        'AssignerId',
        'LocationId',
        'UsageFrom',
        'UsageTo',
      ]),
    );
    for (const prop in this) {
      if (this.hasOwnProperty(prop)) {
        this[lowerFirst(prop)] = this[prop];
      }
    }
  }
}
