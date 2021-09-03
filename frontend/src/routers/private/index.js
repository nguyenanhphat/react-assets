import homeRoutes from './home-routes';
import assetsRoutes from './assets-routes';
import usersRoutes from './users-routes';
import assetsValuation from './valuation-routes';
import globalSettings from './global-settings';

const routes = [
  ...homeRoutes,
  ...assetsRoutes,
  ...assetsValuation,
  ...globalSettings,
  ...usersRoutes,
];

export default routes;
