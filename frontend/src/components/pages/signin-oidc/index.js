import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import userManager, { signinRedirectCallback } from 'services/user-service';
import { HOME } from 'routers/route-path';

const SignInOidcPage = () => {
  const history = useHistory();

  useEffect(() => {
    const signInAsync = async () => {
      const user = await userManager.getUser();
      if (user) {
        history.push(HOME);
        return;
      }
      await signinRedirectCallback();
      history.push(HOME);
    };
    signInAsync().then(res => console.log(res));
  }, [history]);

  return (
    <div>
      Redirecting...
    </div>
  )
};

export default SignInOidcPage;
