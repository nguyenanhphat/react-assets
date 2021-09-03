import { IconCustom } from 'components/atoms';
import { lazy } from 'react';
import * as routePath from '../route-path';

const AssetsValuation = lazy(() => import('modules/AssetValuation/List'));
// const ValuationHistory = lazy(() => import('modules/AssetValuation/List'));

const routes = [
  {
    path: routePath.VALUATION_ASSETS,
    component: AssetsValuation,
    name: 'Assets Valuation',
    exact: true,
    showMenu: true,
    icon: IconCustom.Valuation,
  },
];

export default routes;
