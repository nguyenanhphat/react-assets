import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { check } from 'express-validator';
import validate from '../middlewares/validate';
import {
  getMaintenanceHistoryListOfAsset,
  getDetailMaintenanceHistory,
  updateDetailMaintenanceHistory,
  createDetailMaintenanceHistory,
} from '../controllers/maintenanceHistory';

const router = Router();

router.get('/detail/:id',
  (req, res, next) => {
    req.user = jwt.decode(process.env.TOKEN);
    next();
  },
  getDetailMaintenanceHistory);

router.put('/detail/:id',
  (req, res, next) => {
    req.user = jwt.decode(process.env.TOKEN);
    next();
  },
  updateDetailMaintenanceHistory);

router.post('/detail',
  [
    check('assetId').not().isEmpty().withMessage('AssetId is required'),
    check('cost').not().isEmpty().withMessage('Cost is required'),
    check('costCurrencyUnitId').not().isEmpty().withMessage('CostCurrencyUnitId is required'),
    check('issueDate').not().isEmpty().withMessage('IssueDate is required'),
    check('supplierContractId').not().isEmpty().withMessage('SupplierContractId is required'),
    check('supplierId').not().isEmpty().withMessage('SupplierId is required'),
  ],
  validate,
  (req, res, next) => {
    req.user = jwt.decode(process.env.TOKEN);
    next();
  },
  createDetailMaintenanceHistory);

router.get('/list',
  (req, res, next) => {
    req.user = jwt.decode(process.env.TOKEN);
    next();
  },
  getMaintenanceHistoryListOfAsset);

export default router;
