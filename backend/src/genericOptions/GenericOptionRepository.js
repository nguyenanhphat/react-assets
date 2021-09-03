import dependencyNames from '../constants/dependencyNames';
import modelNames from '../constants/modelNames';

export default class GenericOptionRepository {
  constructor(beans) {
    this.genericOptionModel = beans[dependencyNames.database].models[modelNames.GenericOption];
  }

  findAll = async (where, attributes, include) => {
    const types = await this.genericOptionModel.findAll({ where, attributes, include });
    return types;
  }

  updateOne = async (where, attributes) => {
    const type = await this.genericOptionModel.update(attributes, { where });
    return type;
  }

  findOne = async (where, attributes, include) => {
    const type = await this.genericOptionModel.findOne({ where, attributes, include });
    return type;
  }
}
