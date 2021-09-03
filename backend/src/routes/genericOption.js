import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { getGenericOptions } from '../genericOptions/GenericOptionController';

const router = Router();

router.get('/list',
  (req, res, next) => {
    req.user = jwt.decode(process.env.TOKEN);
    next();
  },
  getGenericOptions);

export default router;
