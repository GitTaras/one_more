import React, { useEffect } from 'react';
import { Formik, Field } from 'formik';
import MyTextField from '../../components/UI/TextField/TextField';
import { signUpSchema } from '../../utils/validators';
import { Paper, Grid, Button, CircularProgress, Snackbar } from '@material-ui/core';
import MuiAlert from '../../components/UI/Alert/MuiAlert';
import { makeStyles } from '@material-ui/core/styles';
import { Face, Fingerprint, Email } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { clearAuth, signUp } from '../../store/auth/authActions';
import useAuthHook from '../../store/auth/useAuthHook';
import withLayout from '../../components/Hocs/withLayout';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(),
  },
}));

const initialValues = {
  fullName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading, isError, errorMessage, currentUser } = useAuthHook();

  useEffect(() => {
    if (!isError && !isLoading && currentUser) {
      history.push('/posts');
    }
  }, [isLoading, isError, currentUser]);

  const closeSnackbar = () => {
    dispatch(clearAuth());
  };

  const handleSubmit = values => {
    dispatch(signUp(values));
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={signUpSchema}
      onSubmit={values => {
        handleSubmit(values);
      }}
    >
      {({ handleSubmit }) => (
        <Grid item sm={8}>
          <form onSubmit={handleSubmit}>
            <Paper className={classes.padding}>
              <div className={classes.margin}>
                <Snackbar open={isError} autoHideDuration={6000} onClose={closeSnackbar}>
                  <MuiAlert severity="error">Error: {errorMessage}</MuiAlert>
                </Snackbar>
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item>
                    <Face />
                  </Grid>
                  <Grid item md={true} sm={true} xs={true}>
                    <Field
                      name="fullName"
                      id="fullName"
                      label="Full Name"
                      type="text"
                      fullWidth
                      autoFocus
                      required
                      component={MyTextField}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item>
                    <Face />
                  </Grid>
                  <Grid item md={true} sm={true} xs={true}>
                    <Field
                      component={MyTextField}
                      name="username"
                      id="username"
                      label="User Name"
                      type="text"
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item>
                    <Email />
                  </Grid>
                  <Grid item md={true} sm={true} xs={true}>
                    <Field
                      component={MyTextField}
                      name="email"
                      id="email"
                      label="Email"
                      type="email"
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item>
                    <Fingerprint />
                  </Grid>
                  <Grid item md={true} sm={true} xs={true}>
                    <Field
                      component={MyTextField}
                      name="password"
                      id="password"
                      label="Password"
                      type="password"
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item>
                    <Fingerprint />
                  </Grid>
                  <Grid item md={true} sm={true} xs={true}>
                    <Field
                      component={MyTextField}
                      name="confirmPassword"
                      id="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container justify="center" style={{ marginTop: '10px' }}>
                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    disabled={isLoading}
                    style={{ textTransform: 'none' }}
                  >
                    Sign Up
                  </Button>
                </Grid>
                <Grid container justify="center" style={{ marginTop: '10px' }}>
                  {isLoading && <CircularProgress size={24} />}
                </Grid>
              </div>
            </Paper>
          </form>
        </Grid>
      )}
    </Formik>
  );
};

export default withLayout(SignUp);
