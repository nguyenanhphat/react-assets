import { IconCustom } from 'components/atoms';

export const REDUX_NAME = 'ASSET_MANAGEMENT';

export const SAVE_SEARCH_PARAMS = `${REDUX_NAME}/saveSearchParams`;

export const SEARCH_PARAMS = {
  limit: 10,
  page: 0,
  name: '',
  typeIds: [],
  subTypeIds: [],
  locationIds: [],
  supplierIds: [],
  manufacturerIds: [],
  assigneeIds: [],
  //pagination
  total: 40,
  // sorter
  sortParam: 'name',
  sortOrder: 'ASC',
};

export const SEARCH_PARAMS_MAINTENANCE_HISTORY = {
  name: '',
  //pagination
  total: 40,
  limit: 10,
  page: 0,
  // sorter
  sortParam: 'id',
  sortOrder: 'DESC',
};

export const SEARCH_PARAMS_USAGE_HISTORY = {
  name: '',
  //pagination
  total: 40,
  limit: 10,
  page: 0,
  // sorter
  sortParam: 'id',
  sortOrder: 'DESC',
};

export const CONTENT_ICON_MENU = [
  { name: 'INFO', key: 'info', icon: IconCustom.Setting },
  { name: 'SETTING', key: 'setting', icon: IconCustom.Setting },
];

export const VIEW_PROPERTY_ASSET = {
  EDIT: 'edit',
  USAGE: 'usage',
  MAINTENANCE: 'maintenance',
};
