import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useUserFetchedData from '../Hocs/useUserFetchedData';
import withLayout from '../Hocs/withLayout';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = useUserFetchedData();
  const WrappedComponent = withLayout(Component);

  return (
    <Route
      {...rest}
      render={props =>
        currentUser ? (
          <WrappedComponent {...props} />
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
