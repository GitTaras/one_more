import React, { useEffect } from 'react';
import { Formik, Field } from 'formik';
import { Paper, Grid, Button, CircularProgress, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Face, Fingerprint, Email } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import MuiAlert from 'components/UI/Alert';
import MyTextField from 'components/UI/TextField';
import { signUpSchema } from 'validation/index';
import { signUp } from 'store/auth/auth-actions';
import { clearAuth } from 'store/auth/auth-actions';
import { useAuth } from 'store/auth/auth-selectors';
import withLayout from 'components/Hocs/withLayout';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(),
  },
}));

const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = ({ history }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { isLoading, isError, errorObj, currentUser } = useAuth();

  useEffect(() => {
    if (!isError && !isLoading && currentUser) {
      history.push('/posts');
    }
  }, [isLoading, isError, currentUser]);

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
            <Paper className={styles.padding}>
              <div className={styles.margin}>
                <Snackbar
                  open={isError}
                  autoHideDuration={6000}
                  onClose={() => dispatch(clearAuth())}
                >
                  <MuiAlert severity="error">Error: {errorObj?.message}</MuiAlert>
                </Snackbar>
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
