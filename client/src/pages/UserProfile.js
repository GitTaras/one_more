import React from 'react';
import {
  Grid,
  Paper,
  CardActions,
  Typography,
  CardContent,
  Card,
  CardMedia,
} from '@material-ui/core';
import { AccountCircle, Edit } from '@material-ui/icons';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useUserFetchedData from '../components/Hooks/useUserFetchedData';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  userIcon: {
    height: 140,
  },
  pos: {
    marginBottom: 12,
  },
});

export default () => {
  const classes = useStyles();
  const currentUser = useUserFetchedData();
  return (
    <Grid item sm={8}>
      <Paper elevation={3}>
        <Card className={classes.root}>
          {currentUser.picture ? (
            <CardMedia className={classes.media} image={currentUser.picture} title="user picture" />
          ) : (
            <div className={classes.media}>
              <AccountCircle className={classes.userIcon} fontSize={'large'} />
            </div>
          )}
          <CardContent>
            <Typography variant="h5" component="h2">
              {currentUser.firstName} {currentUser.lastName}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {currentUser.email}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton aria-label="edit user">
              <Edit />
            </IconButton>
          </CardActions>
        </Card>
      </Paper>
    </Grid>
  );
};
