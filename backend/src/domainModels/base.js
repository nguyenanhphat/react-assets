import { pick } from 'lodash';

export default class BaseDomain {
  constructor(data) {
    Object.assign(
      this,
      pick(data, [
        'CreationTime',
        'CreatorUserId',
        'LastModificationTime',
        'LastModifierUserId',
        'IsDeleted',
        'DeleterUserId',
        'DeletionTime',
      ]),
    );
  }
}
