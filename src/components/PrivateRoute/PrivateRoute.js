import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useUserFetchedData from '../Hocs/useUserFetchedData';
import withLayout from '../Hocs/withLayout';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = useUserFetchedData();

  //TODO MOVE WITH LAYOUT TO COMPONENT EXPORT
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
