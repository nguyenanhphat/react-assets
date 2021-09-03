import { responseApi } from '../utils/response';
import { Injection } from '../injection';
import dependencyNames from '../constants/dependencyNames';

export const createDetailMaintenanceHistory = async (req, res) => {
  const maintenanceHistoryService = Injection.getService(req._containerDI, dependencyNames.maintenanceHistoryService);
  const result = await maintenanceHistoryService.createDetailMaintenanceHistory(req.body, res.__);

  return responseApi(
    res,
    result.errorCode ? result.errorCode : 200,
    result,
  );
};

export const getDetailMaintenanceHistory = async (req, res) => {
  const { id } = req.params;
  const maintenanceHistoryService = Injection.getService(req._containerDI, dependencyNames.maintenanceHistoryService);
  const result = await maintenanceHistoryService.getDetailMaintenanceHistory(id, res.__);

  return responseApi(
    res,
    result.errorCode ? result.errorCode : 200,
    result,
  );
};

export const updateDetailMaintenanceHistory = async (req, res) => {
  const { id } = req.params;
  const maintenanceHistoryService = Injection.getService(req._containerDI, dependencyNames.maintenanceHistoryService);
  const result = await maintenanceHistoryService.updateDetailMaintenanceHistory(id, req.body, res.__);

  return responseApi(
    res,
    result.errorCode ? result.errorCode : 200,
    result,
  );
};

export const getMaintenanceHistoryListOfAsset = async (req, res) => {
  const { assetId, limit, page, sortParam, sortOrder } = req.query;
  const assetManagementService = Injection.getService(req._containerDI, dependencyNames.assetManagementService);
  const result = await assetManagementService.getMaintenanceHistoryListOfAsset(assetId, { limit, page, sortParam, sortOrder }, res.__);

  return responseApi(
    res,
    result.errorCode ? result.errorCode : 200,
    result,
  );
};
