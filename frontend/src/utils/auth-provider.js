import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from 'states/auth/actions';
import { setTokenSession } from './common';

export default function AuthProvider({ userManager: manager, store, children }) {
  let userManager = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    userManager.current = manager

    const onUserLoaded = user => {
      setTokenSession(user.access_token);
      dispatch(loginSuccess(user));
    }

    const onUserUnloaded = () => {
      console.log(`user unloaded`);
    }

    const onAccessTokenExpiring = () => {
      console.log(`user token expiring`)
    }

    const onAccessTokenExpired = () => {
      console.log(`user token expired`)
    }

    const onUserSignedOut = () => {
      console.log(`user signed out`)
    }

    // events for user
    userManager.current.events.addUserLoaded(onUserLoaded)
    userManager.current.events.addUserUnloaded(onUserUnloaded)
    userManager.current.events.addAccessTokenExpiring(onAccessTokenExpiring)
    userManager.current.events.addAccessTokenExpired(onAccessTokenExpired)
    userManager.current.events.addUserSignedOut(onUserSignedOut)

    // Specify how to clean up after this effect:
    return function cleanup() {
      userManager.current.events.removeUserLoaded(onUserLoaded);
      userManager.current.events.removeUserUnloaded(onUserUnloaded);
      userManager.current.events.removeAccessTokenExpiring(onAccessTokenExpiring)
      userManager.current.events.removeAccessTokenExpired(onAccessTokenExpired)
      userManager.current.events.removeUserSignedOut(onUserSignedOut)
    };
  }, [manager, store, dispatch]);

  return (
    React.Children.only(children)
  )
}