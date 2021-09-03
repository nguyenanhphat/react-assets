import { responseApi } from '../utils/response';
import { Injection } from '../injection';
import dependencyNames from '../constants/dependencyNames';

export const addUsageHistoryForCurrentUser = async (req, res, next) => {
  try {
    const { SKU } = req.body;
    const { user } = req;
    const assetManagementService = Injection.getService(req._containerDI, dependencyNames.assetManagementService);
    const result = await assetManagementService.addAssetToUsageHistoryForCurrentUser(SKU, user);
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

export const getUsageHistoryOfCurrentUser = async (req, res, next) => {
  const { user } = req;
  const assetManagementService = Injection.getService(req._containerDI, dependencyNames.assetManagementService);
  try {
    const result = await assetManagementService.getCurrentUserUsageHistory(user);
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

export const getDetailUsageHistory = async (req, res) => {
  const { id } = req.params;
  const usageHistoryService = Injection.getService(req._containerDI, dependencyNames.usageHistoryService);
  const result = await usageHistoryService.getDetailUsageHistory(id, res.__);

  return responseApi(
    res,
    result.errorCode ? result.errorCode : 200,
    result,
  );
};

export const updateDetailUsageHistory = async (req, res) => {
  const { id } = req.params;
  const usageHistoryService = Injection.getService(req._containerDI, dependencyNames.usageHistoryService);
  const result = await usageHistoryService.updateDetailUsageHistory(id, req.body, res.__);

  return responseApi(
    res,
    result.errorCode ? result.errorCode : 200,
    result,
  );
};

export const createDetailUsageHistory = async (req, res) => {
  const usageHistoryService = Injection.getService(req._containerDI, dependencyNames.usageHistoryService);
  const result = await usageHistoryService.createDetailUsageHistory(req.body, res.__);

  return responseApi(
    res,
    result.errorCode ? result.errorCode : 200,
    result,
  );
};

export const getUsageHistoryListOfAsset = async (req, res) => {
  const { assetId, limit, page, name, sortParam, sortOrder } = req.query;
  const assetManagementService = Injection.getService(req._containerDI, dependencyNames.assetManagementService);
  const result = await assetManagementService.getUsageHistoryListOfAsset(assetId, { limit, page, name, sortParam, sortOrder }, res.__);

  return responseApi(
    res,
    result.errorCode ? result.errorCode : 200,
    result,
  );
};
