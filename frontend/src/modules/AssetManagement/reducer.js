import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import * as actions from './actions';
import * as CONST from './constants';
import { SEARCH_PARAMS } from './constants';

export const name = CONST.REDUX_NAME;

const initialState = freeze({
  searchParams: SEARCH_PARAMS,
});

/**
 * @name ChatReducer
 * @type {Function}
 * @description This is ChatReducer handleActions
 * @param {bool} ChatReducer
 * @memberof module:Modules
 */
export default handleActions(
  {
    [actions.saveSearchParams]: (state, action) => {
      return freeze({
        ...state,
        searchParams: action.payload,
      });
    },
  },
  initialState
);
