import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { getGeneralSettings, updateGeneralSettings } from '../generalSettings/GeneralSettingController';
import { check } from 'express-validator';
import validate from '../middlewares/validate';

const router = Router();

router.get('/',
  (req, res, next) => {
    req.user = jwt.decode(process.env.TOKEN);
    next();
  },
  getGeneralSettings);

router.put('/',
  [
    check('assignees').isArray().withMessage('assignees is required'),
    check('types').isArray().withMessage('types is required'),
    check('subTypes').isArray().withMessage('subTypes is required'),
    check('routineDates').isArray().withMessage('routineDates is required'),
    check('statuses').isArray().withMessage('statuses is required'),
  ],
  validate,
  (req, res, next) => {
    req.user = jwt.decode(process.env.TOKEN);
    next();
  },
  updateGeneralSettings);

export default router;
