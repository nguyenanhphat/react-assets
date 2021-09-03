import { API } from 'constants/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'utils/axios';
import * as actions from './actions';
import * as types from './constants';

function* getListAsset(payload) {
  try {
    const res = yield call(() => axios.get(API.ASSETS));
    yield put(actions.getListAssetSuccess(res.data));
  } catch (err) {
    console.log(err);
  }
}

export default function* sagas() {
  yield takeLatest(types.GET_LIST_ASSET, getListAsset);
}
