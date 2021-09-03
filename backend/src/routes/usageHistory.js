import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { check } from 'express-validator';
import validate from '../middlewares/validate';
import {
  createDetailUsageHistory,
  getDetailUsageHistory,
  updateDetailUsageHistory,
  getUsageHistoryListOfAsset,
} from '../controllers/usageHistory';

const router = Router();

router.get('/list',
  (req, res, next) => {
    req.user = jwt.decode(process.env.TOKEN);
    next();
  },
  getUsageHistoryListOfAsset);

router.get('/detail/:id',
  (req, res, next) => {
    req.user = jwt.decode(process.env.TOKEN);
    next();
  },
  getDetailUsageHistory);

router.put('/detail/:id',
  (req, res, next) => {
    req.user = jwt.decode(process.env.TOKEN);
    next();
  },
  updateDetailUsageHistory);

router.post('/detail',
  [
    check('assetId').not().isEmpty().withMessage('AssetId is required'),
    check('assigneeId').not().isEmpty().withMessage('AssigneeId is required'),
    check('locationId').not().isEmpty().withMessage('LocationId is required'),
    check('usageFrom').not().isEmpty().withMessage('UsageFrom is required'),
  ],
  validate,
  (req, res, next) => {
    req.user = jwt.decode(process.env.TOKEN);
    next();
  },
  createDetailUsageHistory);

export default router;
