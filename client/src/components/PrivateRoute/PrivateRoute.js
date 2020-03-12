import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useUserFetchedData from '../Hooks/useUserFetchedData';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = useUserFetchedData();

  return (
    <Route
      {...rest}
      render={props =>
        currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
