import { pick } from 'lodash';

export default class BaseDTO {
  baseFields = [
    'creationTime',
    'creatorUserId',
    'lastModificationTime',
    'lastModifierUserId',
    'isDeleted',
    'deleterUserId',
    'deletionTime',
  ];

  constructor(data) {
    Object.assign(
      this,
      pick(data, this.baseFields),
    );
  }
}
