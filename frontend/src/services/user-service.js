import { UserManager } from 'oidc-client';
import { removeTokenSession } from 'utils/common';

const userManager = new UserManager({
  authority: process.env.REACT_APP_AUTHORITY,
  client_id: process.env.REACT_APP_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
  response_type: process.env.REACT_APP_RESPONSE_TYPE,
  scope: process.env.REACT_APP_SCOPE,
  post_logout_redirect_uri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI,
  loadUserInfo: true,
  silent_redirect_uri: process.env.REACT_APP_SILENT_REDIRECT_URI,
  automaticSilentRenew: true,
  accessTokenExpiringNotificationTime:
    process.env.REACT_APP_ACCESS_TOKEN_EXPIRING_NOTIFICATION_TIME,
});

export const signinRedirect = () => {
  return userManager.signinRedirect();
};

export const signinRedirectCallback = () => {
  return userManager.signinRedirectCallback();
};

export const signoutRedirect = id_token => {
  removeTokenSession();
  userManager.signoutRedirect({ id_token_hint: id_token });
  userManager.removeUser();
};

export const signoutRedirectCallback = () => {
  userManager.signoutRedirectCallback();
  userManager.removeUser();
};

export default userManager;
