import { Injection } from '../injection';
import dependencyNames from '../constants/dependencyNames';
import { filterQueries } from '../utils';

export const getUsersList = async (req, res, next) => {
  const { sortParam, sortOrder, limit, page } = req.query;
  const paginationOption = { sortParam, sortOrder, limit: +limit, page: +page };
  const picks = ['name', 'isActive'];
  const query = filterQueries(req.query, picks);
  const userService = Injection.getService(req._containerDI, dependencyNames.userService);
  try {
    const result = await userService.getAll(query, paginationOption);
    res.status(200).json({
      success: true,
      message: 'Success',
      errorCode: null,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const syncUsersList = async (req, res, next) => {
  const userService = Injection.getService(req._containerDI, dependencyNames.userService);
  try {
    const result = await userService.syncUserFromIdentitySystem();
    res.status(200).json({
      success: true,
      message: 'Success',
      errorCode: null,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};
