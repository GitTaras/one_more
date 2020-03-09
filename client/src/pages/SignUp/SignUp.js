import React, { useEffect } from 'react';
import { Formik, Field } from 'formik';
import MyTextField from '../../components/UI/TextField/TextField';
import { signupSchema } from '../../utils/validators';
import { Paper, Grid, Button, CircularProgress, Snackbar } from '@material-ui/core';
import MuiAlert from '../../components/UI/Alert/MuiAlert';
import { makeStyles } from '@material-ui/core/styles';
import { Face, Fingerprint, Email } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth, signup } from '../../store/auth/actions';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(),
  },
}));

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = ({ history }) => {
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
    dispatch(signup(values));
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={signupSchema}
      onSubmit={values => {
        handleSubmit(values);
      }}
    >
      {({ handleSubmit }) => (
        <Grid sm={8}>
          <form onSubmit={handleSubmit}>
            <Paper className={classes.padding}>
              <div className={classes.margin}>
                <Snackbar open={isError} autoHideDuration={6000} onClose={handleClose}>
                  <MuiAlert severity="error">Error: {errorMessage}</MuiAlert>
                </Snackbar>
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item>
                    <Face />
                  </Grid>
                  <Grid item md={true} sm={true} xs={true}>
                    <Field
                      name="firstName"
                      id="firstName"
                      label="First Name"
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
                      name="lastName"
                      id="lastName"
                      label="Last Name"
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

export default SignUp;
