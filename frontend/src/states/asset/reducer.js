import { fromJS } from 'immutable';
import * as types from './constants';

const initState = fromJS({
  assetData: null,
});

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_LIST_ASSET_SUCCESS: {
      return state.set('assetData', payload);
    }
    default:
      return state;
  }
};
