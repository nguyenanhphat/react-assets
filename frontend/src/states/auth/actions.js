import * as types from './constants';

export const loginSuccess = payload => ({
  type: types.LOGIN_SUCCESS,
  payload
});

export const updateUserInfo = payload => ({
  type: types.UPDATE_USER_INFO,
  payload
});