import { responseApi } from '../utils/response';
import { Injection } from '../injection';
import { filterQueries } from '../utils';
import dependencyNames from '../constants/dependencyNames';

export const getMyAssetsList = async (req, res) => {
  const { user } = req;
  const assetService = Injection.getService(req._containerDI, dependencyNames.assetService);
  const result = await assetService.getCurrentUserAssets(user, res.__);

  return responseApi(
    res,
    result.errorCode ? result.errorCode : 200,
    result,
  );
};

export const getAssetDetailWithCurrentUsageHistory = async (req, res, next) => {
  const { id } = req.params;
  const { isSKU } = req.query;
  try {
    const assetManagementService = Injection.getService(req._containerDI, dependencyNames.assetManagementService);
    const result = await assetManagementService.getAssetDetailWithCurrentHistory(id, isSKU);
    res.status(200).json({
      success: true,
      message: 'Success',
      errorCode: null,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const getAssetDetail = async (req, res) => {
  const { id } = req.params;

  const assetService = Injection.getService(req._containerDI, dependencyNames.assetService);
  const result = await assetService.getAssetDetail(id, res.__);

  return responseApi(
    res,
    result.errorCode ? result.errorCode : 200,
    result,
  );
};

export const getAssetsList = async (req, res) => {
  const { sortParam, sortOrder, limit, page } = req.query;
  const paginationOption = { sortParam, sortOrder, limit: +limit, page: +page };
  const picks = ['name', 'typeIds', 'subTypeIds', 'locationIds', 'supplierIds', 'manufacturerIds', 'assigneeIds', 'anytimeAssigneeIds'];
  const query = filterQueries(req.query, picks);

  const assetService = Injection.getService(req._containerDI, dependencyNames.assetService);
  const result = await assetService.getAssetsList(query, paginationOption, res.__);

  return responseApi(
    res,
    result.errorCode ? result.errorCode : 200,
    result,
  );
};

export const createAsset = async (req, res) => {
  const assetManagementService = Injection.getService(req._containerDI, dependencyNames.assetManagementService);
  const result = await assetManagementService.createAsset(req.body, res.__);

  return responseApi(
    res,
    result.errorCode ? result.errorCode : 200,
    result,
  );
};

export const updateAsset = async (req, res) => {
  const { assetId } = req.params;
  const assetManagementService = Injection.getService(req._containerDI, dependencyNames.assetManagementService);
  const result = await assetManagementService.updateAsset(assetId, req.body, res.__);

  return responseApi(
    res,
    result.errorCode ? result.errorCode : 200,
    result,
  );
};
