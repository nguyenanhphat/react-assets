import dependencyNames from '../constants/dependencyNames';
import modelNames from '../constants/modelNames';

export default class GeneralSettingRepository {
  constructor(beans) {
    this.GeneralSettingModel = beans[dependencyNames.database].models[modelNames.GeneralSetting];
  }

  updateAll = async settings => {
    const settingsUpdatePromises = [];
    for (const setting of settings) {
      settingsUpdatePromises.push(this.GeneralSettingModel.update(
        { valueSetting: setting.valueSetting },
        { where: { keySetting: setting.keySetting }, returning: true },
      ));
    }
    const result = await Promise.allSettled(settingsUpdatePromises);
    return result;
  }

  findAll = async (where, include) => {
    const settings = await this.GeneralSettingModel.findAll({ where, include });
    return settings;
  }
}
