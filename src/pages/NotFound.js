import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
  },
});

const NotFound = () => {
  const styles = useStyles();
  return (
    <Grid container item justify="center" alignItems="center" sm={12} className={styles.root}>
      <Typography variant="h5" component="h2">
        Not Found
      </Typography>
    </Grid>
  );
};

export default NotFound;
