import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../store/auth/auth-selectors';
import withLayout from 'components/Hocs/withLayout';

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log('renderPrivate');
  const { currentUser } = useAuth();
  // const Wrapped = withLayout(Component);

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
