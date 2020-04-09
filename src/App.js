import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navigation from './Navigation';
import { LinearProgress } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { auth } from 'store/auth/auth-actions';
import { useAuth } from 'store/auth/auth-selectors';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '50vh',
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
  const { isAuthorizing } = useAuth();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(auth());
    }
  }, []);

  return (
    <>
      {!isAuthorizing ? (
        <Navigation />
      ) : (
        <div className={styles.root}>
          <LinearProgress
            classes={{
              colorPrimary: styles.colorPrimary,
              barColorPrimary: styles.barColorPrimary,
            }}
          />
        </div>
      )}
    </>
  );
};

export default App;
