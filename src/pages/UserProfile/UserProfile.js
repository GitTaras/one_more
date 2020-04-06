import React, { useState } from 'react';
import { Field, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import {
  Grid,
  Paper,
  CardContent,
  Card,
  CardMedia,
  Button,
  Avatar,
  Snackbar,
  LinearProgress,
} from '@material-ui/core';
import { AccountCircle, Edit, Cancel } from '@material-ui/icons';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import { editUserSchema, updatePasswordSchema } from '../../utils/validators';
import MyTextField from '../../components/UI/TextField/TextField';
import { editAccount, updatePassword } from '../../store/auth/authActions';
import ACTION from '../../store/constants';
import useAuthHook from '../../store/auth/useAuthHook';
import MuiAlert from '../../components/UI/Alert/MuiAlert';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
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
  colorPrimary: {
    backgroundColor: '#e8eaf6',
  },
  barColorPrimary: {
    backgroundColor: '#03a9f4',
  },
}));

export default () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { currentUser, isLoading, isError, errorMessage } = useAuthHook();
  const [state, setState] = useState({ isEditingData: false, isEditingPassword: false });

  const updateUserData = values => {
    if (JSON.stringify(currentUser) !== JSON.stringify(values)) {
      dispatch(editAccount(values));
    }
  };

  const toggleEdit = (field, resetForm) => {
    resetForm();
    setState(state => ({ ...state, [field]: !state[field] }));
  };

  return (
    <Grid item sm={8}>
      <Paper elevation={1} className={classes.padding}>
        <Snackbar
          open={isError}
          autoHideDuration={6000}
          onClose={() => dispatch({ type: ACTION.AUTH_CLEAR_ERROR })}
        >
          <MuiAlert severity="error">Error: {errorMessage}</MuiAlert>
        </Snackbar>
        <Card className={classes.root}>
          {currentUser.picture ? (
            <CardMedia className={classes.media} image={currentUser.picture} title="user picture" />
          ) : (
            <div className={classes.media}>
              {currentUser.avatar ? (
                <Avatar
                  alt={currentUser.fullName}
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
              {({ handleSubmit, resetForm }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2} direction={'column'}>
                    <Grid item>
                      <Field
                        name="username"
                        id="username"
                        label="User Name"
                        type="text"
                        fullWidth
                        autoFocus
                        required
                        disabled={!state.isEditingData}
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
                        disabled={!state.isEditingData}
                        component={MyTextField}
                      />
                    </Grid>
                    {isLoading && (
                      <LinearProgress
                        classes={{
                          colorPrimary: classes.colorPrimary,
                          barColorPrimary: classes.barColorPrimary,
                        }}
                      />
                    )}
                  </Grid>
                  <Grid container spacing={2} direction="row">
                    <Grid item>
                      {state.isEditingData && (
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
                      onClick={() => toggleEdit('isEditingData', resetForm)}
                      aria-label="edit user"
                      className={classes.alignRight}
                    >
                      {state.isEditingData ? <Cancel /> : <Edit />}
                    </IconButton>
                  </Grid>
                </form>
              )}
            </Formik>
          </CardContent>
        </Card>
        <Card className={classes.root}>
          <CardContent>
            <Formik
              initialValues={{ oldPassword: '', password: '' }}
              validationSchema={updatePasswordSchema}
              onSubmit={values => {
                dispatch(updatePassword(values));
              }}
            >
              {({ handleSubmit, resetForm }) => (
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <Grid container spacing={2} direction={'column'}>
                    <Grid item>
                      <Field
                        autoComplete="off"
                        name="oldPassword"
                        id="oldPassword"
                        label="Old Password"
                        type="text"
                        fullWidth
                        autoFocus
                        required
                        disabled={!state.isEditingPassword}
                        component={MyTextField}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        autoComplete="off"
                        name="password"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        autoFocus
                        required
                        disabled={!state.isEditingPassword}
                        component={MyTextField}
                      />
                    </Grid>
                    {isLoading && (
                      <LinearProgress
                        classes={{
                          colorPrimary: classes.colorPrimary,
                          barColorPrimary: classes.barColorPrimary,
                        }}
                      />
                    )}
                  </Grid>
                  <Grid container spacing={2} direction="row">
                    <Grid item>
                      {state.isEditingPassword && (
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
                      onClick={() => toggleEdit('isEditingPassword', resetForm)}
                      aria-label="edit user"
                      className={classes.alignRight}
                    >
                      {state.isEditingPassword ? <Cancel /> : <Edit />}
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
