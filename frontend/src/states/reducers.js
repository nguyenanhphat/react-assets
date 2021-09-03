import { combineReducers } from 'redux';
import { homeName, homeReducer } from './home';
import { authName, authReducer } from './auth';
import { assetName, assetReducer } from './asset';
import { optionName, optionReducer } from './option';
import assetManagementReducer from '../modules/AssetManagement/reducer';
import { REDUX_NAME } from '../modules/AssetManagement/constants';

export default combineReducers({
  [homeName]: homeReducer,
  [authName]: authReducer,
  [assetName]: assetReducer,
  [optionName]: optionReducer,
  [REDUX_NAME]: assetManagementReducer,
});
