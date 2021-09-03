import { Op } from 'sequelize';
import modelNames from '../constants/modelNames';
import dependencyNames from '../constants/dependencyNames';
import MaintenanceHistoryDTO from '../dtos/maintenanceHistory';
import { removeEmpty } from '../utils';

export class MaintenanceHistoryService {
  constructor(beans) {
    this.maintenanceHistoryModel = beans[dependencyNames.database].models[modelNames.MaintenanceHistory];
  }

  checkPeriod = async (assetId, issueDate, completedDate = null) => {
    if (completedDate && new Date(issueDate).getTime() >= new Date(completedDate).getTime()) {
      return {
        message: 'IssueDate needs to be greater than CompletedDate',
        errorCode: 500,
      };
    }

    const assetInMaintenance = await this.maintenanceHistoryModel.findOne({
      where: {
        completedDate: { [Op.eq]: null },
        assetId,
      },
    });
    if (assetInMaintenance) {
      return {
        message: `the asset is being in maintenance with the maintenance history id: ${assetInMaintenance.id}`,
        errorCode: 500,
      };
    }

    const orQuery = completedDate ? [
      { completedDate: { [Op.gte]: new Date(issueDate) } },
      { issueDate: { [Op.gte]: new Date(completedDate) } },
    ] : [
      { completedDate: { [Op.gte]: new Date(issueDate) } },
    ];
    const maintenanceHistoryInTime = await this.maintenanceHistoryModel.findOne({
      where: {
        assetId,
        [Op.or]: orQuery,
      },
    });
    if (maintenanceHistoryInTime) {
      return {
        message: 'the maintenance time is within another maintenance time',
        errorCode: 500,
      };
    }

    return null;
  }

  createDetailMaintenanceHistory = async (body, translationFunction) => {
    try {
      const { assetId, cost, costCurrencyUnitId, issueDate, completedDate, supplierContractId, supplierId, details } = body;

      const data = removeEmpty({ assetId, cost, costCurrencyUnitId, issueDate, completedDate, supplierContractId, supplierId, details });

      const error = await this.checkPeriod(assetId, issueDate, completedDate);
      if (error) return error;

      let maintenanceHistory = await this.maintenanceHistoryModel.create(data);
      const { id } = maintenanceHistory;
      maintenanceHistory = await this.maintenanceHistoryModel.findOne({ where: { id }, include: ['costCurrencyUnit', 'asset'] });

      return {
        data: { maintenanceHistory: new MaintenanceHistoryDTO(maintenanceHistory).toJSON() },
        message: 'Success',
        errorCode: null,
      };
    } catch (e) {
      console.error('error createDetailMaintenanceHistory ', e);
      return {
        data: null,
        message: translationFunction('Server error'),
        errorCode: 500,
      };
    }
  };

  getDetailMaintenanceHistory = async (id, translationFunction) => {
    try {
      const maintenanceHistory = await this.maintenanceHistoryModel.findOne({ where: { id }, include: ['costCurrencyUnit', 'asset'] });

      return {
        data: { maintenanceHistory: new MaintenanceHistoryDTO(maintenanceHistory).toJSON() },
        message: 'Success',
        errorCode: null,
      };
    } catch (e) {
      console.error('error getDetailMaintenanceHistory ', e);
      return {
        data: null,
        message: translationFunction('Server error'),
        errorCode: 500,
      };
    }
  };

  updateDetailMaintenanceHistory = async (id, body, translationFunction) => {
    try {
      const { assetId, cost, costCurrencyUnitId, issueDate, completedDate, supplierContractId, supplierId, details } = body;

      const data = removeEmpty({ assetId, cost, costCurrencyUnitId, issueDate, completedDate, supplierContractId, supplierId, details });

      const error = await this.checkPeriod(assetId, issueDate, completedDate);
      if (error) return error;

      await this.maintenanceHistoryModel.update(data, { where: { id } });

      const maintenanceHistory = await this.maintenanceHistoryModel.findOne({ where: { id }, include: ['costCurrencyUnit', 'asset'] });

      return {
        data: { maintenanceHistory: new MaintenanceHistoryDTO(maintenanceHistory).toJSON() },
        message: 'Success',
        errorCode: null,
      };
    } catch (e) {
      console.error('error updateDetailMaintenanceHistory ', e);
      return {
        data: null,
        message: translationFunction('Server error'),
        errorCode: 500,
      };
    }
  };
}
