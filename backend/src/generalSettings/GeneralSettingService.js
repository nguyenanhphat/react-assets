import dependencyNames from '../constants/dependencyNames';
import { GENERAL_SETTING_KEYS } from './constants';

export default class GeneralSettingService {
  constructor(beans) {
    this.generalSettingRepository = beans[dependencyNames.generalSettingRepository];
  }

  getSetting = async () => {
    const settings = {};
    const settingsResult = await this.generalSettingRepository.findAll({}, []);
    for (const keySetting of Object.values(GENERAL_SETTING_KEYS)) {
      const settingObject = settingsResult.find(item => item.keySetting === keySetting);
      settings[keySetting] = settingObject.valueSetting ? JSON.parse(settingObject.valueSetting) : null;
    }
    return settings;
  };

  updateSetting = async settingsBody => {
    const updatingData = Object.values(GENERAL_SETTING_KEYS).map(keySetting => ({
      keySetting,
      valueSetting: settingsBody[keySetting] ? JSON.stringify(settingsBody[keySetting]) : '',
    }));
    const result = await this.generalSettingRepository.updateAll(updatingData);
    const settings = await this.getSetting();
    return settings;
  }
}
