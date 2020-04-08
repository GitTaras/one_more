import React, { useEffect } from 'react';
import MyTextField from '../components/UI/TextField/TextField';
import { Paper, Grid, Button, CircularProgress, Snackbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MuiAlert from 'components/UI/Alert';
import { Email, Fingerprint } from '@material-ui/icons';
import { Formik, Field } from 'formik';
import { signInSchema } from '../validation';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { signIn } from '../store/auth/auth-actions';
import { useAuth } from '../store/auth/auth-selectors';
import withLayout from '../components/Hocs/withLayout';
import { AUTH_CLEAR_ERROR } from '../store/auth/auth-actions';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(),
  },
}));

const initialValues = {
  email: '',
  password: '',
};

const SignIn = ({ history }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { isLoading, isError, errorObj, currentUser } = useAuth();

  useEffect(() => {
    if (!isError && !isLoading && currentUser) {
      const pathname = history.location.state?.from?.pathname;
      const search = history.location.state?.from?.search;
      history.push({ pathname: pathname || '/posts', search: search || '' });
    }
  }, [isLoading, isError, currentUser]);

  const handleSubmit = values => {
    dispatch(signIn(values));
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={signInSchema}
      onSubmit={values => {
        dispatch(signIn(values));
      }}
    >
      {({ handleSubmit }) => (
        <Grid item sm={8}>
          <form onSubmit={handleSubmit}>
            <Paper className={styles.padding}>
              <div className={styles.margin}>
                <Snackbar
                  open={isError}
                  autoHideDuration={6000}
                  onClose={() => dispatch({ type: AUTH_CLEAR_ERROR })}
                >
                  <MuiAlert severity="error">Error: {errorObj?.message}</MuiAlert>
                </Snackbar>
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
                <Grid container justify="center" style={{ marginTop: '10px' }}>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant="outlined"
                    color="primary"
                    style={{ textTransform: 'none' }}
                  >
                    Sign In
                  </Button>
                </Grid>
                <Grid container justify="center" style={{ marginTop: '10px' }}>
                  {isLoading && <CircularProgress size={24} />}
                </Grid>
                <Grid container justify="space-between">
                  <Grid item>
                    <Link to="#">Forgot password?</Link>
                  </Grid>
                  <Grid item>
                    <Link to={'/sign-up'}>{"Don't have an account? Sign Up"}</Link>
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </form>
        </Grid>
      )}
    </Formik>
  );
};

export default withLayout(SignIn);
