import React from 'react';
import homeRoutes from 'routers/private/home-routes';
import assetsRoutes from 'routers/private/assets-routes';
import valuationRoutes from 'routers/private/valuation-routes';
import assetsGlobalSettingsRoutes from 'routers/private/global-settings';
import usersRoutes from 'routers/private/users';
import Icon from '@ant-design/icons';
import { IconCustom } from 'components/atoms';
const routes = [
  ...homeRoutes,
  ...assetsRoutes,
  ...valuationRoutes,
  {
    name: 'Global Settings',
    icon: <Icon component={IconCustom.Setting} />,
    children: assetsGlobalSettingsRoutes,
  },
  ...usersRoutes,
];
export default routes;
