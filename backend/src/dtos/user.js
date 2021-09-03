import pick from 'lodash/pick';
import BaseDTO from './base';

export default class UserDto extends BaseDTO {
  constructor(data) {
    super(data);
    Object.assign(
      this,
      pick(data, [
        'id',
        'empCode',
        'firstName',
        'lastName',
        'email',
        'isActive',
        'lastSyncDate',
      ]),
    );
  }

  toJSON() {
    const jsonObj = {};
    Object.assign(
      jsonObj,
      pick(this, [
        'id',
        'empCode',
        'firstName',
        'lastName',
        'email',
        'isActive',
        'lastSyncDate',
      ]),
    );
    return jsonObj;
  }
}
