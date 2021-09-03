import { pick } from 'lodash';

export default class GenericOptionDTO {
  constructor(data) {
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
    jsonObj.parent = this.parent ? new GenericOptionDTO(this.parent).toJSON() : null;
    return jsonObj;
  }
}
