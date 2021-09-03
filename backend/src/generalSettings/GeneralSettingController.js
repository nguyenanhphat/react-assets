import { Injection } from '../injection';
import dependencyNames from '../constants/dependencyNames';

export const getGeneralSettings = async (req, res, next) => {
  try {
    const generalSettingService = Injection.getService(req._containerDI, dependencyNames.generalSettingService);
    const generalSettings = await generalSettingService.getSetting();

    const result = { generalSettings };

    res.status(200).json({
      success: true,
      message: res.__('Success'),
      errorCode: null,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const updateGeneralSettings = async (req, res, next) => {
  try {
    const { assignees, types, subTypes, routineDates, statuses } = req.body;
    const generalSettingService = Injection.getService(req._containerDI, dependencyNames.generalSettingService);
    const generalSettings = await generalSettingService.updateSetting({ assignees, types, subTypes, routineDates, statuses });

    const result = { generalSettings };

    res.status(200).json({
      success: true,
      message: res.__('Success'),
      errorCode: null,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};
