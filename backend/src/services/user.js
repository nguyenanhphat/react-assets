import axios from 'axios';
import loGet from 'lodash/get';
import dependencyNames from '../constants/dependencyNames';
import modelNames from '../constants/modelNames';
import UserDto from '../dtos/user';

export class UserService {
  constructor(beans) {
    this.userModel = beans[dependencyNames.database].models[modelNames.User];
    this.userRepository = beans[dependencyNames.userRepository];
  }

  getAll = async (whereQuery, paginationOption) => {
    const { sortParam, sortOrder, limit, page } = paginationOption;
    const result = await this.userRepository.getAllWithPagingAndFilter(whereQuery, {
      sortParam: sortParam || 'id',
      sortOrder: sortOrder || 'DESC',
      limit: limit || 10,
      page: page || 0,
    });
    const { count, rows } = result;
    return { count, users: rows?.length ? rows.map(row => new UserDto(row)) : [] };
  };

  getUsersList = async () => {
    try {
      const res = await axios.get(
        `${process.env.IDENTITY_SERVER}/api/userApi`,
        { headers: { Authorization: `Bearer ${process.env.TOKEN}` } },
      );
      return loGet(res, ['data'], []);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  syncUserFromIdentitySystem = async () => {
    const userListFromIdentity = await this.getUsersList();
    if (userListFromIdentity?.length) {
      const existedCheckPromises = userListFromIdentity.map(item => this.checkExistUser(item));
      const existedCheckResult = await Promise.all(existedCheckPromises);
      const upsertUserPromises = existedCheckResult.map(item => this.upsertUser(item));
      const result = await Promise.all(upsertUserPromises);
      for (const user of result) {
        if (!user) {
          throw new Error('Error when sync user');
        }
      }
      return result;
    }
  };

  upsertUser = async ({ user, isExisted, userFromIdentity }) => {
    try {
      let result = null;
      if (!isExisted) {
        result = await this.userModel.create({
          empCode: userFromIdentity.userCode,
          firstName: userFromIdentity.firstName,
          lastName: userFromIdentity.lastName,
          email: userFromIdentity.email,
          isActive: userFromIdentity.isActive,
          lastSyncDate: new Date(),
        });
      } else {
        result = await user.update({
          firstName: userFromIdentity.firstName,
          lastName: userFromIdentity.lastName,
          isActive: userFromIdentity.isActive,
          lastSyncDate: new Date(),
        });
      }
      return result;
    } catch (e) {
      console.error('upsertedUser error ', e);
      return null;
    }
  };

  checkExistUser = async userFromIdentity => {
    try {
      const user = await this.userModel.findOne({ where: { empCode: userFromIdentity.userCode } });
      return { user, isExisted: !!user, userFromIdentity };
    } catch (e) {
      console.error('checkExistUser error ', e);
      return { user: null, isExisted: false, userFromIdentity };
    }
  };
}
