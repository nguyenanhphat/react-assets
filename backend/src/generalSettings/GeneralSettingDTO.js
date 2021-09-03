import { pick } from 'lodash';
import { GENERAL_SETTING_KEYS } from './constants';

export default class GeneralSettingDTO {
  constructor(data) {
    Object.assign(
      this,
      pick(data, [
        'id',
        ...Object.values(GENERAL_SETTING_KEYS),
      ]),
    );
  }

  toJSON() {
    const jsonObj = {};
    Object.assign(
      jsonObj,
      pick(this, [
        'id',
        ...Object.values(GENERAL_SETTING_KEYS),
      ]),
    );
    return jsonObj;
  }
}
