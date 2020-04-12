import React, { useState } from 'react';
import { Field, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import {
  Grid,
  Paper,
  CardContent,
  Card,

  Button,
  Avatar,
  Snackbar,
  LinearProgress,
} from '@material-ui/core';
import { AccountCircle, Edit, Cancel } from '@material-ui/icons';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import { editUserSchema, updatePasswordSchema } from 'validation/index';
import MyTextField from 'components/UI/TextField';
import { editAccount, updatePassword, editAvatar } from 'store/auth/auth-actions';
import { AUTH_CLEAR_ERROR } from 'store/auth/auth-actions';
import { useAuth } from 'store/auth/auth-selectors';
import MuiAlert from 'components/UI/Alert';
import withLayout from 'components/Hocs/withLayout';

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

const UserProfile = () => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const { currentUser, isLoading, isError, errorObj } = useAuth();
  const [state, setState] = useState({ isEditingData: false, isEditingPassword: false });
  const [isSuccess, setSuccess] = useState(false);

  const updateUserData = values => {
    if (
      JSON.stringify({ username: currentUser.username, email: currentUser.email }) !==
      JSON.stringify(values)
    ) {
      dispatch(editAccount(values))
        .then(() => setSuccess(true))
        .catch(() => {});
    }
  };

  const toggleEdit = (field, resetForm) => {
    resetForm();
    setState(state => ({ ...state, [field]: !state[field] }));
  };

  const openFileInput = () => {
    const fileInput = document.getElementById('file');
    fileInput.click();
  };

  const onFileInputChange = e => {
    const file = e.target.files[0];

    document.getElementById('file').value = null;

    if (!file) {
      return;
    }

    dispatch(editAvatar(file))
      .then(() => setSuccess(true))
      .catch(() => {});
  };

  return (
    <Grid item sm={8}>
      <Paper elevation={1} className={styles.padding}>
        <Snackbar
          open={isError}
          autoHideDuration={6000}
          onClose={() => dispatch({ type: AUTH_CLEAR_ERROR })}
        >
          <MuiAlert severity="error">Error: {errorObj?.message}</MuiAlert>
        </Snackbar>
        <Snackbar open={isSuccess} autoHideDuration={6000} onClose={() => setSuccess(false)}>
          <MuiAlert severity="success">Success</MuiAlert>
        </Snackbar>
        <Card className={styles.root}>
          <div className={styles.media}>
            {currentUser.avatar ? (
              <Avatar
                alt={currentUser.username}
                srcSet={
                  currentUser.avatar.startsWith('http')
                    ? currentUser.avatar
                    : `http://localhost:8000${currentUser.avatar}`
                }
                src={
                  currentUser.avatar.startsWith('http')
                    ? currentUser.avatar
                    : `http://localhost:8000${currentUser.avatar}`
                }
                className={styles.userAvatar}
                onClick={openFileInput}
              />
            ) : (
              <AccountCircle className={styles.userIcon} fontSize={'large'} />
            )}
          </div>
          )}
          <CardContent>
            <Formik
              enableReinitialize={true}
              initialErrors={errorObj?.errors}
              initialValues={{ username: currentUser.username, email: currentUser.email }}
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
                          colorPrimary: styles.colorPrimary,
                          barColorPrimary: styles.barColorPrimary,
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
                      className={styles.alignRight}
                    >
                      {state.isEditingData ? <Cancel /> : <Edit />}
                    </IconButton>
                  </Grid>
                </form>
              )}
            </Formik>
          </CardContent>
          <input
            type="file"
            onChange={onFileInputChange}
            accept="image/x-png,image/gif,image/jpeg"
            style={{ display: 'none' }}
            id="file"
          />
        </Card>
        <Card className={styles.root}>
          <CardContent>
            <Formik
              enableReinitialize={true}
              initialErrors={errorObj?.errors}
              initialValues={{ oldPassword: '', password: '' }}
              validationSchema={updatePasswordSchema}
              onSubmit={(values) => {
                dispatch(updatePassword(values))
                  .then(() => setSuccess(true))
                  .catch(() => {});
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
                          colorPrimary: styles.colorPrimary,
                          barColorPrimary: styles.barColorPrimary,
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
                      className={styles.alignRight}
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

export default withLayout(UserProfile);
