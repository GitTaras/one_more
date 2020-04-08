import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useUserFetchedData from '../Hocs/useUserFetchedData';
import { useAuth } from '../../store/auth/auth-selectors';

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log('renderPrivate');
  const { currentUser } = useAuth();
  //const currentUser = useUserFetchedData();

  return (
    <Route
      {...rest}
      render={props =>
        currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/sign-in',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
