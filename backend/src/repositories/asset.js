import dependencyNames from '../constants/dependencyNames';
import modelNames from '../constants/modelNames';
import { ATTACHMENT } from '../constants/modelEmun';
import NotFound from '../infra/exceptions/NotFound';

export default class AssetRepository {
  constructor(beans) {
    this.assetModel = beans[dependencyNames.database].models[modelNames.Asset];
    this.attachmentModel = beans[dependencyNames.database].models[modelNames.Attachment];
  }

  findOne = async (where, attributes, include) => {
    const asset = await this.assetModel.findOne({ where, attributes, include });
    return asset;
  }

  updateById = async (data, id) => {
    try {
      const result = await this.assetModel.update(data, { where: { id } });
      return result;
    } catch (e) {
      console.log('UsageHistoryRepository update error ', e);
      return null;
    }
  };

  getByIdOrSKU = async (identifier, isSKU) => {
    const asset = await this.assetModel.findOne(
      {
        where: isSKU ? { sku: identifier } : { id: identifier },
        include: [
          'purchase',
          'specification',
          'location',
          'type',
          'subType',
          'assignee',
        ],
      },
    );
    if (!asset) {
      throw new NotFound('Asset not found');
    }
    asset.attachments = await this.attachmentModel.findAll({
      where: {
        entityType: ATTACHMENT.entityType.asset,
        entityId: asset.id,
      },
    });
    return asset;
  };
}
