import { pick } from 'lodash';
import BaseDTO from './base';

export default class AttachmentDTO extends BaseDTO {
  constructor(data) {
    super(data);
    Object.assign(
      this,
      pick(data, [
        'id',
        'entityId',
        'attachmentLink',
        'type',
        'entityType',
        'name',
      ]),
    );
  }

  toJSON() {
    const jsonObj = {};
    Object.assign(
      jsonObj,
      pick(this, [
        'id',
        'entityId',
        'type',
        'entityType',
        'name',
      ]),
    );
    jsonObj.attachmentLink = `https://drive.google.com/uc?export=view&id=${this.attachmentLink}`;
    return jsonObj;
  }
}
