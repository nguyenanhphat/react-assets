import { lowerFirst, pick } from 'lodash';
import BaseDomain from './base';
export class UserDomain extends BaseDomain {
  constructor(data) {
    super(data);
    Object.assign(
      this,
      pick(data, [
        'Id',
        'EmpCode',
        'FirstName',
        'LastName',
        'Email',
        'IsActive',
        'LastSyncDate',
      ]),
    );
    for (const prop in this) {
      if (this.hasOwnProperty(prop)) {
        this[lowerFirst(prop)] = this[prop];
      }
    }
  }
}
