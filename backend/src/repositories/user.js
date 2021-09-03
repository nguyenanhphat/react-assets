import { where, fn, col, Op } from 'sequelize';
import dependencyNames from '../constants/dependencyNames';
import modelNames from '../constants/modelNames';

export default class UserRepository {
  constructor(beans) {
    this.userModel = beans[dependencyNames.database].models[modelNames.User];
  }

  getAllWithPagingAndFilter = (filterQuery, paginationOption) => {
    let query = null;
    const { name, ...rest } = filterQuery;
    query = rest;
    if (name) {
      query[Op.or] = {
        namesQuery: where(
          fn(
            'concat',
            fn('LOWER', col('firstName')),
            ' ',
            fn('LOWER', col('lastName')),
          ),
          {
            [Op.like]: `%${name}%`,
          },
        ),
      };
    }
    let order = null;
    if (paginationOption?.sortParam) {
      if (paginationOption?.sortParam === 'firstName') {
        order = [[fn(
          'concat',
          fn('LOWER', col('firstName')),
          ' ',
          fn('LOWER', col('lastName')),
        ), paginationOption.sortOrder || 'DESC']];
      } else {
        order = [[paginationOption.sortParam, paginationOption.sortOrder || 'DESC']];
      }
    }

    return this.userModel.findAndCountAll(
      {
        where: query,
        limit: (+paginationOption.limit),
        offset: (+paginationOption.page) * (+paginationOption.limit),
        include: [],
        order, // DESC/ASC
      },
    );
  };
}
