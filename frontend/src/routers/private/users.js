import { lazy } from 'react';
import * as routePath from '../route-path';
import { IconCustom } from 'components/atoms';

const HomePage = lazy(() => import('components/pages/home'));

const routes = [
  {
    path: routePath.USERS,
    component: HomePage,
    name: 'Users',
    exact: true,
    showMenu: true,
    icon: IconCustom.Lead,
  },
];

export default routes;
