import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { HOME } from 'routers/route-path';
import { signoutRedirectCallback } from 'services/user-service';

const SignOutOidcPage = () => {
  const history = useHistory();
  useEffect(() => {
    const signOutAsync = async () => {
      await signoutRedirectCallback();
      history.push(HOME);
    };
    signOutAsync();
  }, [history]);

  return <div>Redirecting...</div>;
};

export default SignOutOidcPage;
