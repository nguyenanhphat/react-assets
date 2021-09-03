import * as types from './constants';

export const getListAsset = payload => ({
  type: types.GET_LIST_ASSET,
  payload,
});

export const getListAssetSuccess = payload => ({
  type: types.GET_LIST_ASSET_SUCCESS,
  payload,
});
