import { pick } from 'lodash';
import UsageHistoryDTO from '../usageHistory/usageHistory';
import AssetDTO from './asset';

export default class AssetWithUsageHistoryDTO extends AssetDTO {
  usageHistory;

  constructor(data) {
    super(data);
    Object.assign(
      this,
      pick(data, [
        'usageHistory',
      ]),
    );
  }

  toJSON() {
    const jsonObj = super.toJSON();
    jsonObj.usageHistory = this.usageHistory ? new UsageHistoryDTO(this.usageHistory) : null;
    return jsonObj;
  }
}
