import { createSelector } from 'reselect';
import { STATE_NAME } from './constants';

const getAssetState = state => state[STATE_NAME];

export const selectListAsset = () =>
  createSelector(getAssetState, state => state.get('assetData'));
