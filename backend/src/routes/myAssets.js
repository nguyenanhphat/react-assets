import { Router } from 'express';
import jwt from 'jsonwebtoken';
import {
  addUsageHistoryForCurrentUser,
  getUsageHistoryOfCurrentUser,
} from '../controllers/usageHistory';
import { getAssetDetailWithCurrentUsageHistory } from '../controllers/asset';

const router = Router();

router.get('/',
  (req, res, next) => {
    req.user = jwt.decode(process.env.TOKEN);
    next();
  },
  getUsageHistoryOfCurrentUser);

router.post('/',
  (req, res, next) => {
    req.user = jwt.decode(process.env.TOKEN);
    next();
  },
  addUsageHistoryForCurrentUser);

router.get('/:id',
  (req, res, next) => {
    req.user = jwt.decode(process.env.TOKEN);
    next();
  },
  getAssetDetailWithCurrentUsageHistory);

export default router;
