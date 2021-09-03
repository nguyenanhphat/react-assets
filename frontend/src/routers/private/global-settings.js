import { IconCustom } from 'components/atoms';
import { lazy } from 'react';
import * as routePath from '../route-path';

const AssetsValuation = lazy(() => import('modules/AssetValuation/List'));

const routes = [
  {
    path: routePath.GENERAL_SETTINGS,
    component: AssetsValuation,
    name: 'General Settings',
    exact: true,
    showMenu: true,
    icon: IconCustom.GeneralSetting,
  },
];

export default routes;
