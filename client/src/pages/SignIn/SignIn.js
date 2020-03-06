import React, { useEffect } from 'react';
import MyTextField from '../../components/UI/TextField/TextField';
import { Paper, Grid, Button, CircularProgress, Snackbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MuiAlert from '../../components/UI/Alert/MuiAlert';
import { Email, Fingerprint } from '@material-ui/icons';
import { Formik, Field } from 'formik';
import { signinSchema } from '../../utils/validators';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { signin, clearAuth } from '../../store/auth/actions';

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
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);
  const isError = useSelector(state => state.auth.isError);
  const errorMessage = useSelector(state => state.auth.errorMessage);
  const currentUser = useSelector(state => state.auth.currentUser);

  useEffect(() => {
    if (!isError && !isLoading && localStorage.getItem('token') && currentUser) {
      history.push('/chat');
    }
  }, [isLoading, isError, currentUser]);

  const handleClose = () => {
    dispatch(clearAuth());
  };

  const handleSubmit = values => {
    dispatch(signin(values));
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={signinSchema}
      onSubmit={values => {
        handleSubmit(values);
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Paper className={classes.padding}>
            <div className={classes.margin}>
              <Snackbar open={isError} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert severity="error">Error: {errorMessage}</MuiAlert>
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
                  <Link>Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to={'/signup'}>{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </div>
          </Paper>
        </form>
      )}
    </Formik>
  );
};

export default SignIn;