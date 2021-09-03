import { all } from 'redux-saga/effects';
import { homeSaga } from './home';
import { authSaga } from './auth';
import { assetSaga } from './asset';

export default function* rootSaga() {
  yield all([homeSaga(), authSaga(), assetSaga()]);
}
