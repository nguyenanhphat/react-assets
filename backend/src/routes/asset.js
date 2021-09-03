import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { check } from 'express-validator';
import validate from '../middlewares/validate';
import {
  getMyAssetsList,
  getAssetsList,
  createAsset,
  updateAsset,
  getAssetDetail,
} from '../controllers/asset';

const router = Router();
router.get('/me/list',
  (req, res, next) => {
    req.user = jwt.decode(process.env.TOKEN);
    next();
  },
  getMyAssetsList);

router.get('/detail/:id',
  (req, res, next) => {
    req.user = jwt.decode(process.env.TOKEN);
    next();
  },
  getAssetDetail);

router.get('/list',
  (req, res, next) => {
    req.user = jwt.decode(process.env.TOKEN);
    next();
  },
  getAssetsList);

router.post('/detail',
  [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('typeId').not().isEmpty().withMessage('TypeId is required'),
    check('locationId').not().isEmpty().withMessage('LocationId is required'),
    check('manufacturerId').not().isEmpty().withMessage('ManufacturerId is required'),
    check('model').not().isEmpty().withMessage('Model is required'),
    check('serialNumber').not().isEmpty().withMessage('SerialNumber is required'),
    check('uuid').not().isEmpty().withMessage('uuid is required'),
    check('state').not().isEmpty().withMessage('State is required'),
    check('warrantyPeriod').not().isEmpty().withMessage('WarrantyPeriod is required'),
    check('technicalSpecification').not().isEmpty().withMessage('TechnicalSpecification is required'),
    check('supplierId').not().isEmpty().withMessage('SupplierId is required'),
    check('supplierContractId').not().isEmpty().withMessage('SupplierContractId is required'),
    check('purchaseDate').not().isEmpty().withMessage('PurchaseDate is required'),
    check('purchaseValue').not().isEmpty().withMessage('PurchaseValue is required'),
    check('costCurrencyUnitId').not().isEmpty().withMessage('CostCurrencyUnitId is required'),
  ],
  validate,
  (req, res, next) => {
    req.user = jwt.decode(process.env.TOKEN);
    next();
  },
  createAsset);

router.put('/detail/:assetId',
  (req, res, next) => {
    req.user = jwt.decode(process.env.TOKEN);
    next();
  },
  updateAsset);

export default router;
