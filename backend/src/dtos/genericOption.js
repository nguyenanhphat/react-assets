import { pick } from 'lodash';
import BaseDTO from './base';

export default class GenericOptionDTO extends BaseDTO {
  constructor(data) {
    super(data);
    Object.assign(
      this,
      pick(data, [
        'id',
        'name',
        'group',
        'parentId',
        'parent',
      ]),
    );
  }

  toJSON() {
    const jsonObj = {};
    Object.assign(
      jsonObj,
      pick(this, [
        'id',
        'name',
        'group',
      ]),
    );
    jsonObj.parent = this.parent && this.parentId ? new GenericOptionDTO(this.parent).toJSON() : null;
    return jsonObj;
  }
}
