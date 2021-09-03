import { lazy } from 'react';
import * as routePath from '../route-path';
import { IconCustom } from 'components/atoms';

const UserPage = lazy(() => import('modules/UserManagement/List'));

const routes = [
  {
    path: routePath.USERS,
    component: UserPage,
    name: 'Users',
    exact: true,
    showMenu: true,
    icon: IconCustom.Lead,
  },
];

export default routes;
