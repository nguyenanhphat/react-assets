import { Injection } from '../injection';
import dependencyNames from '../constants/dependencyNames';
import GenericOptionDTO from './GenericOptionDTO';

export const getGenericOptions = async (req, res, next) => {
  try {
    const { group, parentId } = req.query;
    const genericOptionService = Injection.getService(req._containerDI, dependencyNames.genericOptionService);
    let genericOptions = await genericOptionService.getGenericOptions(group, parentId);
    genericOptions = genericOptions.map(genOpt => new GenericOptionDTO(genOpt).toJSON());

    const result = { genericOptions };

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
