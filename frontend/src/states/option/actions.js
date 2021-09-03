import * as types from './constants';

export const getListOption = payload => ({
  type: types.GET_LIST_OPTION,
  payload,
});

export const getListOptionSuccess = payload => ({
  type: types.GET_LIST_OPTION_SUCCESS,
  payload,
});
