import { Sequelize } from 'sequelize';
import loGet from 'lodash/get';
import loUniq from 'lodash/uniq';
import AssetDTO from '../dtos/asset/asset';
import dependencyNames from '../constants/dependencyNames';
import modelNames from '../constants/modelNames';
const { Op } = Sequelize;

export class AssetService {
  constructor(beans) {
    this.assetModel = beans[dependencyNames.database].models[modelNames.Asset];
    this.userModel = beans[dependencyNames.database].models[modelNames.User];
    this.usageHistoryModel = beans[dependencyNames.database].models[modelNames.UsageHistory];
    this.purchaseModel = beans[dependencyNames.database].models[modelNames.Purchase];
    this.specificationModel = beans[dependencyNames.database].models[modelNames.Specification];
    this.assetValuationHistoryModel = beans[dependencyNames.database].models[modelNames.AssetValuationHistory];

    this.attachmentRepository = beans[dependencyNames.attachmentRepository];

    this.googleApis = beans[dependencyNames.googleApis];
  }

  getAssetDetail = async (id, translationFunction) => {
    try {
      const asset = await this.assetModel.findOne(
        {
          where: { id },
          include: [
            'assignee',
            'location',
            'type',
            'subType',
            'currentValueCurrencyUnit',
            {
              model: this.specificationModel,
              as: 'specification',
              include: ['manufacturer'],
            },
            {
              model: this.purchaseModel,
              as: 'purchase',
              include: ['costCurrencyUnit'],
            },
            'attachments',
          ],
        },
      );

      return {
        data: { asset: new AssetDTO(asset).toJSON() },
        message: 'Success',
        errorCode: null,
      };
    } catch (e) {
      console.error('error getAssetDetail ', e);
      return {
        data: null,
        message: translationFunction('Server error'),
        errorCode: 500,
      };
    }
  };

  getAssetsList = async (query, paginationOption, translationFunction) => {
    try {
      const where = {};
      if (query.name) where.name = { [Op.like]: `%${query.name.trim()}%` };

      ['typeIds', 'subTypeIds', 'locationIds', 'assigneeIds'].forEach(param => {
        if (query[param]) {
          const parsedParam = JSON.parse(query[param]);
          if (Array.isArray(parsedParam) && parsedParam.length > 0) {
            where[param.substring(0, param.length - 1)] = { [Op.in]: loUniq(parsedParam) };
          }
        }
      });

      // const anytimeAssigneeIds = query.anytimeAssigneeIds ? JSON.parse(query.anytimeAssigneeIds) : [];
      // const usageHistoriesQuery = {};
      // if (Array.isArray(anytimeAssigneeIds) && anytimeAssigneeIds.length > 0) {
      //   usageHistoriesQuery['$usageHistories.assigneeId$'] = { [Op.in]: loUniq(anytimeAssigneeIds) };
      // }

      const manufacturerIds = query.manufacturerIds ? JSON.parse(query.manufacturerIds) : [];
      if (Array.isArray(manufacturerIds) && manufacturerIds.length > 0) {
        where['$specification.manufacturerId$'] = { [Op.in]: loUniq(manufacturerIds) };
      }

      const supplierIds = query.supplierIds ? JSON.parse(query?.supplierIds) : [];
      if (Array.isArray(supplierIds) && supplierIds.length > 0) {
        where['$purchase.supplierId$'] = { [Op.in]: loUniq(supplierIds) };
      }

      const { sortParam, sortOrder, limit, page } = paginationOption;
      let sort;
      switch (sortParam) {
        case 'name':
          sort = ['name'];
          break;
        case 'type':
          sort = ['type', 'name'];
          break;
        case 'location':
          sort = ['location', 'name'];
          break;
        case 'purchasedDate':
          sort = ['purchase', 'time'];
          break;
        case 'purchasedValue':
          sort = ['purchase', 'cost'];
          break;
        case 'currentValue':
          sort = ['currentValue'];
          break;
        case 'status':
          sort = ['status'];
          break;
        default:
          sort = null;
      }

      const data = await this.assetModel.findAndCountAll(
        {
          where,
          limit: limit || 100,
          offset: page ? page * (limit || 100) : 0,
          include: [
            'assignee',
            'location',
            'type',
            'subType',
            'currentValueCurrencyUnit',
            {
              model: this.specificationModel,
              as: 'specification',
              include: ['manufacturer'],
            },
            {
              model: this.purchaseModel,
              as: 'purchase',
              include: ['costCurrencyUnit'],
            },
            // {
            //   model: this.usageHistoryModel,
            //   as: 'usageHistories',
            //   where: usageHistoriesQuery,
            // },
          ],
          order: sort ? [[...sort, sortOrder || 'desc']] : null,
        },
      );

      const assets = loGet(data, ['rows'], []).map(row => (new AssetDTO(row)).toJSON());
      const count = loGet(data, ['count'], 0);

      return {
        data: { assets, count },
        message: 'Success',
        errorCode: null,
      };
    } catch (e) {
      console.error('error getAssetsList ', e);
      return {
        data: null,
        message: translationFunction('Server error'),
        errorCode: 500,
      };
    }
  };
}
