import { lazy } from 'react';
import * as routePath from '../route-path';
import { IconCustom } from 'components/atoms';

const HomePage = lazy(() => import('components/pages/home'));

const routes = [
  {
    path: routePath.HOME,
    component: HomePage,
    name: 'Dashboard',
    exact: true,
    showMenu: true,
    icon: IconCustom.Report,
  },
];

export default routes;
