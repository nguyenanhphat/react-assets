import { pick } from 'lodash';

export default class AttachmentDTO {
  constructor(data) {
    Object.assign(
      this,
      pick(data, [
        'id',
        'entityId',
        'attachmentLink',
        'entityType',
        'name',
        'type',
      ]),
    );
  }

  getID() {
    return this.id;
  }

  getAttachmentLink() {
    return this.attachmentLink;
  }

  toJSON() {
    const jsonObj = {};
    Object.assign(
      jsonObj,
      pick(this, [
        'id',
        'entityId',
        'name',
      ]),
    );
    jsonObj.attachmentLink = `https://drive.google.com/uc?export=view&id=${this.attachmentLink}`;
    return jsonObj;
  }
}
