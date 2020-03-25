import React, { useState } from 'react';
import { Grid, Paper, CardContent, Card, CardMedia, Button, Avatar } from '@material-ui/core';
import { AccountCircle, Edit, Cancel } from '@material-ui/icons';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import { editUserSchema } from '../../utils/validators';
import { Field, Formik } from 'formik';
import MyTextField from '../../components/UI/TextField/TextField';
import { useDispatch } from 'react-redux';
import { editAccount } from '../../store/auth/authActions';
import useAuthHook from '../../store/auth/useAuthHook';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    maxWidth: '50%',
  },
  padding: {
    padding: theme.spacing(4),
  },
  media: {
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    height: '100%',
    flex: 1,
  },
  userAvatar: {
    height: '100%',
    width: 'fit-content',
  },
  email: {
    marginBottom: 12,
  },
  alignRight: {
    marginLeft: 'auto',
  },
}));

export default () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { currentUser, isLoading } = useAuthHook();
  const [isEditing, setEditing] = useState(false);

  const updateUserData = values => {
    if (JSON.stringify(currentUser) !== JSON.stringify(values)) {
      dispatch(editAccount(values));
    }
  };

  const edit = () => {
    setEditing(!isEditing);
  };

  return (
    <Grid item sm={8}>
      <Paper elevation={1} className={classes.padding}>
        <Card className={classes.root}>
          {currentUser.picture ? (
            <CardMedia className={classes.media} image={currentUser.picture} title="user picture" />
          ) : (
            <div className={classes.media}>
              {currentUser.avatar ? (
                <Avatar
                  alt={`${currentUser.firstName} ${currentUser.lastName}`}
                  srcSet={currentUser.avatar}
                  src={currentUser.avatar}
                  className={classes.userAvatar}
                />
              ) : (
                <AccountCircle className={classes.userIcon} fontSize={'large'} />
              )}
            </div>
          )}
          <CardContent>
            <Formik
              initialValues={{ ...currentUser }}
              validationSchema={editUserSchema}
              onSubmit={values => {
                updateUserData(values);
              }}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2} direction={'column'}>
                    <Grid item>
                      <Field
                        name="firstName"
                        id="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        autoFocus
                        required
                        disabled={!isEditing}
                        component={MyTextField}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        name="lastName"
                        id="lastName"
                        label="Last Name"
                        type="text"
                        fullWidth
                        autoFocus
                        required
                        disabled={!isEditing}
                        component={MyTextField}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        name="email"
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        autoFocus
                        required
                        disabled={!isEditing}
                        component={MyTextField}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} direction="row">
                    <Grid item>
                      {isEditing && (
                        <Button
                          type="submit"
                          variant="outlined"
                          color="primary"
                          disabled={isLoading}
                          style={{ textTransform: 'none' }}
                        >
                          Save
                        </Button>
                      )}
                    </Grid>
                    <IconButton
                      onClick={edit}
                      aria-label="edit user"
                      className={classes.alignRight}
                    >
                      {isEditing ? <Cancel /> : <Edit />}
                    </IconButton>
                  </Grid>
                </form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Paper>
    </Grid>
  );
};
