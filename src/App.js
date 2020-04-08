import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navigation from './Navigation';
import { LinearProgress } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { auth } from 'store/auth/auth-actions';
import { useAuth } from 'store/auth/auth-selectors';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  colorPrimary: {
    backgroundColor: '#e8eaf6',
  },
  barColorPrimary: {
    backgroundColor: '#03a9f4',
  },
}));

const App = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { /*currentUser,*/ isAuthorizing } = useAuth();
  console.log('render main');
  useEffect(() => {
    if (/*!currentUser &&*/ localStorage.getItem('token')) {
      dispatch(auth());
    }
  }, []);

  return (
    <>
      {!isAuthorizing ? (
        <Navigation />
      ) : (
        <LinearProgress
          classes={{
            colorPrimary: styles.colorPrimary,
            barColorPrimary: styles.barColorPrimary,
          }}
        />
      )}{' '}
    </>
  );
};

export default App;
