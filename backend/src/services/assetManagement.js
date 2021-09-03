import { where, fn, col, Op } from 'sequelize';
import loGet from 'lodash/get';
import { uniq } from 'lodash';
import shortid from 'shortid';
import modelNames from '../constants/modelNames';
import dependencyNames from '../constants/dependencyNames';
import { ATTACHMENT, USAGE_HISTORY } from '../constants/modelEmun';
import UsageHistoryDTO from '../dtos/usageHistory/usageHistory';
import MaintenanceHistoryDTO from '../dtos/maintenanceHistory';
import AssetWithUsageHistoryDTO from '../dtos/asset/assetWithUsageHistory';
import NotFound from '../infra/exceptions/NotFound';
import { removeEmpty } from '../utils';

export class AssetManagementService {
  constructor(beans) {
    this.assetModel = beans[dependencyNames.database].models[modelNames.Asset];
    this.userModel = beans[dependencyNames.database].models[modelNames.User];
    this.genericOptionModel = beans[dependencyNames.database].models[modelNames.GenericOption];
    this.usageHistoryModel = beans[dependencyNames.database].models[modelNames.UsageHistory];
    this.maintenanceHistoryModel = beans[dependencyNames.database].models[modelNames.MaintenanceHistory];
    this.attachmentModel = beans[dependencyNames.database].models[modelNames.Attachment];
    this.purchaseModel = beans[dependencyNames.database].models[modelNames.Purchase];
    this.specificationModel = beans[dependencyNames.database].models[modelNames.Specification];

    this.assetRepository = beans[dependencyNames.assetRepository];
    this.attachmentRepository = beans[dependencyNames.attachmentRepository];
    this.usageHistoryRepository = beans[dependencyNames.usageHistoryRepository];

    this.usageHistoryService = beans[dependencyNames.usageHistoryService];
    this.genericOptionService = beans[dependencyNames.genericOptionService];
    this.assetService = beans[dependencyNames.assetService];

    this.googleApis = beans[dependencyNames.googleApis];
  }

  addAssetToUsageHistoryForCurrentUser = async SKU => {
    const resultAsset = await this.assetModel.findOne({ where: { sku: SKU } });
    // const assigneeId = user.id;
    const assigneeId = 1;

    const addedUsageHistory = await this.usageHistoryModel.create({
      assetId: resultAsset.id,
      assigneeId,
      locationId: resultAsset.locationId,
      usageFrom: new Date(),
      usageTo: new Date(),
    });
    // make user to current owner of asset
    await this.assetModel.update({ assigneeId }, { where: { id: resultAsset.id } });
    const inUseUsageHistories = await this.usageHistoryRepository.getAllExceptAUsageHistory({
      status: USAGE_HISTORY.status.inUse,
      assetId: resultAsset.id,
    }, addedUsageHistory.id);
    // update in-use usage history to handed-over
    await this.usageHistoryService.changUsageHistoriesToHandedOver(inUseUsageHistories);

    const asset = await this.assetRepository.getByIdOrSKU(resultAsset.id, false);
    asset.usageHistory = await this.usageHistoryRepository.getLatestByAssetId(asset.id);
    return { asset: new AssetWithUsageHistoryDTO(asset).toJSON() };
  };

  getAssetDetailWithCurrentHistory = async (id, isSKU) => {
    const asset = await this.assetRepository.getByIdOrSKU(id, isSKU);
    asset.usageHistory = await this.usageHistoryRepository.getLatestByAssetId(asset.id);
    return { asset: new AssetWithUsageHistoryDTO(asset).toJSON() };
  };

  getCurrentUserUsageHistory = async user => {
    const { userCode } = user;
    const resultUser = await this.userModel.findOne({ where: { empCode: userCode } });
    if (!resultUser) {
      throw new NotFound('User does not exist');
    }

    const usageHistoriesResult = await this.usageHistoryModel.findAll(
      {
        where: { assigneeId: resultUser.id },
        include: [
          {
            model: this.assetModel,
            as: 'asset',
            include: [
              {
                model: this.specificationModel,
                as: 'specification',
                include: [
                  'manufacturer',
                ],
              },
              'location',
              'type',
              'subType',
              'assignee',
            ],
          },
          'assignee',
        ],
        order: [
          ['usageFrom', 'DESC'],
        ],
      },
    );
    const assetIds = usageHistoriesResult?.length ? usageHistoriesResult.map(item => item.asset.id) : [];
    if (assetIds?.length) {
      const attachments = await this.attachmentModel.findAll({
        where: { entityId: {
          [Op.in]: uniq(assetIds),
        },
        entityType: ATTACHMENT.entityType.asset },
      });
      usageHistoriesResult.forEach(usageHistory => {
        const assetTemp = usageHistory.asset;
        const attachmentsOfAsset = attachments.filter(item => item.entityId === assetTemp.id);
        usageHistory.asset.attachments = attachmentsOfAsset?.length ? attachmentsOfAsset : [];
      });
    }

    return { assets: usageHistoriesResult?.length ? usageHistoriesResult.map(item => {
      const { asset: assetTemp, ...usageHistoryTemp } = item.toJSON();
      item.asset.usageHistory = usageHistoryTemp;
      return new AssetWithUsageHistoryDTO(item.asset);
    }) : [] };
  };

  getUsageHistoryListOfAsset = async (assetId, { limit, page, name, sortParam, sortOrder }, translationFunction) => {
    try {
      const whereQuery = {};
      if (assetId) whereQuery.assetId = assetId;

      if (name) {
        whereQuery[Op.or] = [
          where(
            fn(
              'concat',
              fn('LOWER', col('assignee.firstName')),
              ' ',
              fn('LOWER', col('assignee.lastName')),
            ),
            {
              [Op.like]: `%${name}%`,
            },
          ),
        ];
      }

      let sort;
      switch (sortParam) {
        case 'assignee':
          sort = ['assignee', 'firstName'];
          break;
        case 'usageFrom':
          sort = ['usageFrom'];
          break;
        case 'usageTo':
          sort = ['usageTo'];
          break;
        case 'location':
          sort = ['location', 'name'];
          break;
        default:
          sort = null;
      }

      const data = await this.usageHistoryModel.findAndCountAll(
        {
          limit: +limit,
          offset: (+page) * limit,
          where: whereQuery,
          include: ['location', 'assigner', 'assignee'],
          order: sort ? [[...sort, sortOrder || 'desc']] : [['usageFrom', 'asc']],
        },
      );

      const handoverDocumentPromises = loGet(data, ['rows'], [])
        .map(row => this.attachmentRepository
          .findAll({ entityId: row.id, entityType: ATTACHMENT.entityType.usageHistory }));

      const handoverDocumentsList = await Promise.all(handoverDocumentPromises);

      const usageHistories = loGet(data, ['rows'], []).map((row, index) => {
        row.handoverDocuments = handoverDocumentsList[index];
        return new UsageHistoryDTO(row).toJSON();
      });

      const count = loGet(data, ['count'], 0);

      return {
        data: { count, usageHistories },
        message: 'Success',
        errorCode: null,
      };
    } catch (e) {
      console.error('error getUsageHistoryListOfAsset ', e);
      return {
        data: null,
        message: translationFunction('Server error'),
        errorCode: 500,
      };
    }
  };

  getMaintenanceHistoryListOfAsset = async (assetId, { limit, page, sortParam, sortOrder }, translationFunction) => {
    try {
      const whereQuery = {};
      if (assetId) whereQuery.assetId = assetId;

      let sort;
      switch (sortParam) {
        case 'cost':
          sort = ['cost'];
          break;
        case 'issueDate':
          sort = ['issueDate'];
          break;
        case 'completedDate':
          sort = ['completedDate'];
          break;
        default:
          sort = null;
      }

      const data = await this.maintenanceHistoryModel.findAndCountAll(
        {
          limit: +limit,
          offset: (+page) * limit,
          where: whereQuery,
          include: ['costCurrencyUnit', 'asset'],
          order: sort ? [[...sort, sortOrder || 'desc']] : [['issueDate', 'asc']],
        },
      );

      const maintenanceHistories = loGet(data, ['rows'], []).map(row => (new MaintenanceHistoryDTO(row)).toJSON());
      const count = loGet(data, ['count'], 0);
      return {
        data: { count, maintenanceHistories },
        message: 'Success',
        errorCode: null,
      };
    } catch (e) {
      console.error('error getMaintenanceHistoryListOfAsset ', e);
      return {
        data: null,
        message: translationFunction('Server error'),
        errorCode: 500,
      };
    }
  };

  createAsset = async (body, translationFunction) => {
    try {
      const {
        name, typeId, subTypeId, locationId, assigneeId, status,
        manufacturerId, model, serialNumber, uuid, warrantyPeriod, technicalSpecification,
        supplierId, supplierContractId, purchaseDate, purchaseValue, costCurrencyUnitId, state,
        attachmentIds,
      } = body;

      if (!parseFloat(purchaseValue)) {
        return {
          data: null,
          message: translationFunction('Wrong purchaseValue format'),
          errorCode: 500,
        };
      }

      const value = parseFloat(purchaseValue).toFixed(3);

      // create asset
      const assetData = removeEmpty({
        name,
        sku: shortid.generate(),
        typeId,
        subTypeId,
        status,
        assigneeId,
        locationId,
        currentValue: value,
        currentValueCurrencyUnitId: costCurrencyUnitId,
      });
      const googleDriveParentId = await this.genericOptionService.getGoogleDriveParentId(subTypeId || typeId);

      const assetFolder = await this.googleApis.createFolder(`${uuid} - ${name}`, googleDriveParentId);
      const folderId = assetFolder.id;
      const asset = await this.assetModel.create({ ...assetData, googleDriveFolderId: folderId });
      const assetId = asset.id;

      // update attachments and move attachments to asset folder
      const whereQuery = { id: { [Op.in]: Array.isArray(attachmentIds) ? uniq(attachmentIds) : [] } };
      const attributes = { entityType: ATTACHMENT.entityType.asset, entityId: assetId };
      const resultAttachments = await this.attachmentRepository.updateAll(whereQuery, attributes);

      const promises = resultAttachments.map(attachment => {
        const { attachmentLink } = attachment;
        return this.googleApis.moveFile(attachmentLink, folderId);
      });

      await Promise.all(promises);

      // create specification
      const specificationData = removeEmpty({
        assetId,
        model,
        serialNumber,
        manufacturerId,
        uuid,
        warrantyPeriod,
        technicalSpecification,
      });
      await this.specificationModel.create(specificationData);

      // create purchase
      const purchaseData = removeEmpty({
        assetId,
        time: purchaseDate,
        cost: value,
        costCurrencyUnitId,
        supplierId,
        supplierContractId,
        state,
      });
      await this.purchaseModel.create(purchaseData);

      // return value
      const assetDetailData = await this.assetService.getAssetDetail(assetId, () => {});

      return {
        data: { asset: loGet(assetDetailData, ['data', 'asset'], {}) },
        message: 'Success',
        errorCode: null,
      };
    } catch (e) {
      console.error('error createAsset ', e);
      return {
        data: null,
        message: translationFunction('Server error'),
        errorCode: 500,
      };
    }
  };

  updateAsset = async (assetId, body, translationFunction) => {
    try {
      const {
        name, typeId, subTypeId, locationId, assigneeId, status,
        manufacturerId, model, serialNumber, warrantyPeriod, technicalSpecification,
        supplierId, supplierContractId, purchaseDate, purchaseValue, costCurrencyUnitId, state,
        attachmentIds,
      } = body;

      if (!parseFloat(purchaseValue)) {
        return {
          data: null,
          message: translationFunction('Wrong purchaseValue format'),
          errorCode: 500,
        };
      }

      const value = parseFloat(purchaseValue).toFixed(3);

      const assetPromise = this.assetRepository.findOne({ id: assetId }, ['googleDriveFolderId', 'id', 'name', 'typeId', 'subTypeId']);
      const specificationPromise = this.specificationModel.findOne({ where: { assetId }, attributes: ['uuid'] });
      const [asset, specification] = await Promise.all([assetPromise, specificationPromise]);
      const queryAssetName = asset.name;
      const queryAssetTypeId = asset.typeId;
      const queryAssetSubTypeId = asset.subTypeId;
      const { uuid } = specification;
      let { googleDriveFolderId } = asset;

      // update attachments and move attachments to asset folder
      if (subTypeId || typeId) {
        const googleDriveParentId = await this.genericOptionService.getGoogleDriveParentId(subTypeId || typeId);
        if (!googleDriveFolderId) { // create asset folder
          const assetFolder = await this.googleApis.createFolder(`${uuid} - ${name || queryAssetName}`, googleDriveParentId);
          googleDriveFolderId = assetFolder.id;
          await this.assetModel.update({ googleDriveFolderId }, { where: { id: assetId } });
        } else { // move asset folder
          await this.googleApis.moveFile(googleDriveFolderId, googleDriveParentId);
          // await this.googleApis.renameFile(googleDriveFolderId, `${uuid} - ${name || queryAssetName}`);
        }
      }

      if (Array.isArray(attachmentIds)) {
        // update and move old attachments to root
        let whereQuery = { entityType: ATTACHMENT.entityType.asset, entityId: assetId, id: { [Op.notIn]: attachmentIds } };
        const resultAttachments = await this.attachmentRepository.updateAll(whereQuery, { entityId: null });
        let promises = resultAttachments
          .map(attachment => {
            const { attachmentLink } = attachment;
            // TODO delete file
            return this.googleApis.moveFile(attachmentLink, process.env.GOOGLE_DRIVE_ROOT_FOLDER);
          });
        await Promise.all(promises);

        if (!googleDriveFolderId) { // create asset folder if does not exist
          const query = (subTypeId || typeId) || (queryAssetSubTypeId || queryAssetTypeId);
          const googleDriveParentId = await this.genericOptionService.getGoogleDriveParentId(query);
          const assetFolder = await this.googleApis.createFolder(`${uuid} - ${name || queryAssetName}`, googleDriveParentId);
          googleDriveFolderId = assetFolder.id;
          await this.assetModel.update({ googleDriveFolderId }, { where: { id: assetId } });
        }

        // add new attachments to asset
        whereQuery = { id: { [Op.in]: uniq(attachmentIds) } };
        const attributes = { entityId: assetId, entityType: ATTACHMENT.entityType.asset };
        const updatedAttachments = await this.attachmentRepository.updateAll(whereQuery, attributes);

        promises = updatedAttachments.map(attachment => {
          const { attachmentLink } = attachment;
          return this.googleApis.moveFile(attachmentLink, googleDriveFolderId);
        });
        await Promise.all(promises);
      }

      // update asset
      const assetData = removeEmpty({
        name,
        typeId,
        subTypeId,
        status,
        assigneeId,
        locationId,
        currentValue: value,
        currentValueCurrencyUnitId: costCurrencyUnitId,
      });

      await this.assetModel.update(assetData, { where: { id: assetId } });

      // update specification
      const specificationData = removeEmpty({
        model,
        serialNumber,
        manufacturerId,
        warrantyPeriod,
        technicalSpecification,
      });
      await this.specificationModel.update(specificationData, { where: { assetId } });

      // update purchase
      const purchaseData = removeEmpty({
        supplierId,
        time: purchaseDate,
        cost: value,
        costCurrencyUnitId,
        supplierContractId,
        state,
      });
      await this.purchaseModel.update(purchaseData, { where: { assetId } });

      // return value
      const assetDetailData = await this.assetService.getAssetDetail(assetId, () => {});

      return {
        data: { asset: loGet(assetDetailData, ['data', 'asset'], {}) },
        message: 'Success',
        errorCode: null,
      };
    } catch (e) {
      console.error('error createAsset ', e);
      return {
        data: null,
        message: translationFunction('Server error'),
        errorCode: 500,
      };
    }
  };
}
