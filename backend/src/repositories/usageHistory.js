import { Op } from 'sequelize';
import dependencyNames from '../constants/dependencyNames';
import modelNames from '../constants/modelNames';

export default class UsageHistoryRepository {
  constructor(beans) {
    this.usageHistoryModel = beans[dependencyNames.database].models[modelNames.UsageHistory];
  }

  getAllExceptAUsageHistory = (query, usageHistoryId) => this.usageHistoryModel.findAll({
    where: {
      ...query,
      id: {
        [Op.not]: usageHistoryId,
      },
    },
  });

  updateById = async (data, id) => {
    try {
      const result = await this.usageHistoryModel.update(data, { where: { id } });
      return result;
    } catch (e) {
      console.log('UsageHistoryRepository update error ', e);
      return null;
    }
  };

  getLatestByAssetId = async assetId => {
    const result = await this.usageHistoryModel.findAll({
      limit: 1,
      where: {
        assetId,
      },
      order: [['creationTime', 'DESC']],
    });
    return result?.length ? result[0] : null;
  }

  findUsageHistoryInUse = async assetId => {
    const result = await this.usageHistoryModel.findOne({
      where: {
        usageTo: { [Op.eq]: null },
        assetId,
      },
    });
    return result;
  }

  findByUsageInTime = async (assetId, usageFrom, usageTo) => {
    const orQuery = usageTo ? [
      { usageTo: { [Op.gte]: new Date(usageFrom) } },
      { usageFrom: { [Op.gte]: new Date(usageTo) } },
    ] : [
      { usageTo: { [Op.gte]: new Date(usageFrom) } },
    ];

    const result = await this.usageHistoryModel.findOne({
      where: {
        assetId,
        [Op.or]: orQuery,

      },
    });
    return result;
  }

  findLastUsageHistory = async where => {
    const usageHistories = await this.usageHistoryModel.findAll({
      limit: 1,
      where,
      order: [['usageFrom', 'DESC']],
    });
    return usageHistories[0] || null;
  }

  findFirstUsageHistory = async where => {
    const usageHistories = await this.usageHistoryModel.findAll({
      limit: 1,
      where,
      order: [['usageFrom', 'ASC']],
    });
    return usageHistories[0] || null;
  }
}
