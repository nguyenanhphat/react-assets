import { IconCustom } from 'components/atoms';
import { lazy } from 'react';
import * as routePath from '../route-path';

const AssetListPage = lazy(() => import('modules/AssetManagement/List'));
const AssetAddEditPage = lazy(() => import('modules/AssetManagement/AddEdit'));
const AssetPropertyPage = lazy(() =>
  import('modules/AssetManagement/Property')
);

const routes = [
  {
    path: routePath.ASSETS,
    component: AssetListPage,
    name: 'Assets',
    exact: true,
    showMenu: true,
    icon: IconCustom.Asset,
  },
  {
    path: routePath.ASSET_ADD_EDIT,
    component: AssetAddEditPage,
    exact: true,
    showMenu: false,
  },
  {
    path: routePath.ASSET_PROPERTY,
    component: AssetPropertyPage,
    exact: true,
    showMenu: false,
  },
];

export default routes;
