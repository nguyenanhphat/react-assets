import { pick } from 'lodash';
import BaseDTO from '../base';
import PurchaseDTO from '../purchase';
import SpecificationDTO from '../specification';
import GenericOptionDTO from '../genericOption';
import UserDTO from '../user';
import AttachmentDTO from '../attachment';
import { ATTACHMENT } from '../../constants/modelEmun';

export default class AssetDTO extends BaseDTO {
  attachments = [];

  constructor(data) {
    super(data);
    Object.assign(
      this,
      pick(data, [
        'id',
        'name',
        'activeTime',
        'assigneeId',
        'locationId',
        'status',
        'typeId',
        'subTypeId',
        'sku',
        'specification',
        'purchase',
        'location',
        'type',
        'subType',
        'assignee',
        'attachments',
        'currentValueCurrencyUnit',
        'currentValue',
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
        'activeTime',
        'assigneeId',
        'locationId',
        'status',
        'typeId',
        'subTypeId',
        'sku',
        'currentValue',
      ]),
    );

    jsonObj.assignee = this.assignee ? new UserDTO(this.assignee).toJSON() : null;
    jsonObj.purchase = this.purchase ? new PurchaseDTO(this.purchase).toJSON() : null;
    jsonObj.specification = this.specification ? new SpecificationDTO(this.specification).toJSON() : null;
    jsonObj.location = this.location ? new GenericOptionDTO(this.location).toJSON() : null;
    jsonObj.type = this.type ? new GenericOptionDTO(this.type).toJSON() : null;
    jsonObj.subType = this.subType ? new GenericOptionDTO(this.subType).toJSON() : null;
    jsonObj.currentValueCurrencyUnit = this.currentValueCurrencyUnit ? new GenericOptionDTO(this.currentValueCurrencyUnit).toJSON() : null;

    jsonObj.attachments = this.attachments?.length
      ? this.attachments
        .filter(item => item.entityType === ATTACHMENT.entityType.asset)
        .map(item => new AttachmentDTO(item))
      : [];
    return jsonObj;
  }
}
