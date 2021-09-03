import { fromJS } from 'immutable';
import * as types from './constants';

const initState = fromJS({
  optionData: null,
});

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_LIST_OPTION_SUCCESS: {
      return state.set('optionData', payload);
    }
    default:
      return state;
  }
};
