import { pick } from 'lodash';
import BaseDTO from '../base';
import UserDTO from '../user';
import GenericOptionDTO from '../genericOption';
import AttachmentDTO from '../attachment';
import AssetWithUsageHistoryDTO from '../asset/assetWithUsageHistory';
import { ATTACHMENT } from '../../constants/modelEmun';

export default class UsageHistoryDTO extends BaseDTO {
  constructor(data) {
    super(data);
    Object.assign(
      this,
      pick(data, [
        'id',
        'assetId',
        'asset',
        'assigneeId',
        'assignee',
        'assignerId',
        'assigner',
        'locationId',
        'location',
        'usageFrom',
        'usageTo',
        'handoverContent',
        'status',
        'handoverDocuments',
      ]),
    );
  }

  toJSON() {
    const jsonObj = {};
    Object.assign(
      jsonObj,
      pick(this, [
        'id',
        'assetId',
        'assigneeId',
        'assignerId',
        'locationId',
        'usageFrom',
        'usageTo',
        'handoverContent',
        'status',
      ]),
    );
    jsonObj.asset = this.asset ? new AssetWithUsageHistoryDTO(this.asset) : null;
    jsonObj.assignee = this.assignee ? new UserDTO(this.assignee) : null;
    jsonObj.assigner = this.assigner ? new UserDTO(this.assigner) : null;
    jsonObj.location = this.location ? new GenericOptionDTO(this.location) : null;
    jsonObj.handoverDocuments = this.handoverDocuments?.length
      ? this.handoverDocuments
        .filter(item => item.entityType === ATTACHMENT.entityType.usageHistory)
        .map(item => new AttachmentDTO(item))
      : [];
    return jsonObj;
  }
}
