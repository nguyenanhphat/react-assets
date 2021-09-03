import { createSelector } from 'reselect';
import { STATE_NAME } from './constants';

const getAuthState = state => state[STATE_NAME];

export const selectToken = () =>
  createSelector(getAuthState, state => state.get('accessToken'));

export const selectUserInfo = () =>
  createSelector(getAuthState, state => state.get('userInfo'));
