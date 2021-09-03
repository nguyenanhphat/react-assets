import { createAction } from 'redux-actions';
import * as CONST from './constants';

export const saveSearchParams = createAction(CONST.SAVE_SEARCH_PARAMS);
