import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import userManager from 'services/user-service';
import { updateUserInfo } from 'states/auth/actions';
import { selectToken, selectUserInfo } from 'states/auth/selectors';

const PrivateRoute = ({ children, userRoles, name, ...rest }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectToken());
  const userInfo = useSelector(selectUserInfo());

  useEffect(() => {
    if (accessToken) {
      return;
    }
    userManager.signinRedirect();
  }, [accessToken]);

  useEffect(() => {
    if (userInfo) {
      return;
    }

    userManager.getUser().then(user => {
      dispatch(updateUserInfo(user));
    });
  }, [userInfo, dispatch]);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return children;
      }}
    />
  );
};

export default PrivateRoute;
