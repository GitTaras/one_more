import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useUserDataFetch from '../Hooks/useUserDataFetch';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoading, isError, errorMessage, currentUser } = useUserDataFetch();

  useEffect(() => {
    if (isError) {
      localStorage.removeItem('token');
    }
  }, [isError]);

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
