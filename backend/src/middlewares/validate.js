import { validationResult } from 'express-validator';
import { responseApi } from '../utils/response';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = {};
    errors.array().map(err => {
      error[err.param] = err.msg;
      return err;
    });
    return responseApi(res, 422, {
      data: { error },
      message: 'Invalid request',
      errorCode: 422,
    });
  }

  next();
};

export default validate;
