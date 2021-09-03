import { lazy } from 'react';
import * as routePath from '../route-path';

const SignInOidcPage = lazy(() => import('components/pages/signin-oidc'));
const SignOutOidcPage = lazy(() => import('components/pages/signout-oidc'));

const routes = [
  {
    path: routePath.SIGN_IN_OIDC,
    component: SignInOidcPage,
    exact: true,
  },
  {
    path: routePath.SIGN_OUT_OIDC,
    component: SignOutOidcPage,
    exact: true,
  },
];
export default routes;
