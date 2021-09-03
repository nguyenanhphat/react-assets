import { Op } from 'sequelize';
import loGet from 'lodash/get';
import modelNames from '../constants/modelNames';
import dependencyNames from '../constants/dependencyNames';
import UsageHistoryDTO from '../dtos/usageHistory/usageHistory';
import { removeEmpty } from '../utils';
import { USAGE_HISTORY, ATTACHMENT } from '../constants/modelEmun';

export class UsageHistoryService {
  constructor(beans) {
    this.usageHistoryModel = beans[dependencyNames.database].models[modelNames.UsageHistory];
    this.attachmentModel = beans[dependencyNames.database].models[modelNames.Attachment];

    this.assetRepository = beans[dependencyNames.assetRepository];
    this.usageHistoryRepository = beans[dependencyNames.usageHistoryRepository];
    this.attachmentRepository = beans[dependencyNames.attachmentRepository];
    this.googleApis = beans[dependencyNames.googleApis];
  }

  checkPeriod = async (assetId, usageFrom, usageTo = null) => {
    if (usageTo && new Date(usageFrom).getTime() >= new Date(usageTo).getTime()) {
      return {
        message: 'Usage to needs to be greater than usage from',
        errorCode: 500,
      };
    }

    const assetInUse = await this.usageHistoryRepository.findUsageHistoryInUse(assetId);
    if (assetInUse) {
      return {
        message: `the asset is being used with the usage history id: ${assetInUse.id}`,
        errorCode: 500,
      };
    }

    const usageHistoryInTime = await this.usageHistoryRepository.findByUsageInTime(assetId, usageFrom, usageTo);
    if (usageHistoryInTime) {
      return {
        message: 'the usage time is within another usage time',
        errorCode: 500,
      };
    }

    return null;
  }

  updateAsset = async assetId => {
    // update current assignee for asset
    const lastUsageHistory = await this.usageHistoryRepository.findLastUsageHistory({ assetId });
    if (lastUsageHistory) {
      await this.assetRepository.updateById({ assigneeId: lastUsageHistory.assigneeId }, assetId);
    }

    // update active time for asset
    const firstUsageHistory = await this.usageHistoryRepository.findFirstUsageHistory({ assetId });
    if (firstUsageHistory) {
      await this.assetRepository.updateById({ activeTime: firstUsageHistory.usageFrom }, assetId);
    }
  }

  createDetailUsageHistory = async (body, translationFunction) => {
    try {
      const { assetId, assigneeId, assignerId, locationId, usageFrom, usageTo, handoverContent, attachmentIds } = body;

      const data = removeEmpty({ assetId, assigneeId, assignerId, locationId, usageFrom, usageTo, handoverContent });

      const error = await this.checkPeriod(assetId, usageFrom, usageTo);
      if (error) return error;

      let usageHistory = await this.usageHistoryModel.create(data);
      const usageHistoryId = usageHistory.id;

      if (Array.isArray(attachmentIds)) {
        const where = { entityId: null, id: { [Op.in]: attachmentIds } };
        const attributes = { entityType: ATTACHMENT.entityType.usageHistory, entityId: usageHistoryId };
        await this.attachmentRepository.updateAll(where, attributes);
      }

      await this.updateAsset(assetId);

      const resultData = await this.getDetailUsageHistory(usageHistoryId, () => {});
      usageHistory = loGet(resultData, ['data', 'usageHistory'], {});

      return {
        data: { usageHistory },
        message: 'Success',
        errorCode: null,
      };
    } catch (e) {
      console.error('error createDetailUsageHistory ', e);
      return {
        data: null,
        message: translationFunction('Server error'),
        errorCode: 500,
      };
    }
  };

  getDetailUsageHistory = async (id, translationFunction) => {
    try {
      const usageHistory = await this.usageHistoryModel.findOne({
        where: { id },
        include: ['location', 'assignee', 'assigner', 'asset', 'handoverDocuments'],
      });

      return {
        data: { usageHistory: new UsageHistoryDTO(usageHistory).toJSON() },
        message: 'Success',
        errorCode: null,
      };
    } catch (e) {
      console.error('error getDetailUsageHistory ', e);
      return {
        data: null,
        message: translationFunction('Server error'),
        errorCode: 500,
      };
    }
  };

  updateDetailUsageHistory = async (id, body, translationFunction) => {
    try {
      const { assetId, assigneeId, assignerId, locationId, usageFrom, usageTo, handoverContent, attachmentIds } = body;

      const usageHistoryData = removeEmpty({ assetId, assigneeId, assignerId, locationId, usageFrom, usageTo, handoverContent });

      await this.usageHistoryModel.update(usageHistoryData, { where: { id } });

      if (usageFrom) {
        const queryUsageHistory = await this.usageHistoryModel.findOne({ where: { id } });
        const error = await this.checkPeriod(queryUsageHistory.assetId, usageFrom, usageTo);
        if (error) return error;
      }

      if (Array.isArray(attachmentIds)) {
        await this.attachmentRepository.updateAll(
          { entityId: id, entityType: ATTACHMENT.entityType.usageHistory },
          { entityType: null, entityId: null },
        );

        const where = { entityId: null, id: { [Op.in]: attachmentIds } };
        const attributes = { entityType: ATTACHMENT.entityType.usageHistory, entityId: id };
        await this.attachmentRepository.updateAll(where, attributes);
      }

      await this.updateAsset(assetId);

      const resultData = await this.getDetailUsageHistory(id, () => {});
      const usageHistory = loGet(resultData, ['data', 'usageHistory'], {});

      return {
        data: { usageHistory },
        message: 'Success',
        errorCode: null,
      };
    } catch (e) {
      console.error('error updateDetailUsageHistory ', e);
      return {
        data: null,
        message: translationFunction('Server error'),
        errorCode: 500,
      };
    }
  };

  changUsageHistoriesToHandedOver = async usageHistories => {
    if (usageHistories?.length) {
      const changeToHandedOverPromises = usageHistories.map(usageHistory => this.usageHistoryRepository.updateById({
        status: USAGE_HISTORY.status.handedOver,
      }, usageHistory.id));
      await Promise.all(changeToHandedOverPromises);
    }
  };
}
