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
  const classes = useStyles();
  return (
    <Grid justify="center" alignItems="center" sm={12} className={classes.root}>
      <Typography variant="h5" component="h2">
        Not Found
      </Typography>
    </Grid>
  );
};

export default NotFound;
