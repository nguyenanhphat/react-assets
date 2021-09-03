import { Router } from 'express';
import jwt from 'jsonwebtoken';
import loGet from 'lodash/get';
import {
  getUsersList,
  syncUsersList,
} from '../controllers/user';

const router = Router();

router.get('/',
  (req, res, next) => {
    // const decoded = jwt.decode(process.env.TOKEN);
    next();
  },
  getUsersList);

router.post('/sync',
  (req, res, next) => {
    // const decoded = jwt.decode(process.env.TOKEN);
    next();
  },
  syncUsersList);

export default router;
