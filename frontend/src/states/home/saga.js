import { takeLatest } from 'redux-saga/effects';
function* onExample() {
}

export default function* sagas() {
  yield takeLatest('EXAMPLE_ACTION', onExample);
}
