import React from 'react';
import { Formik, Field } from 'formik';
import MyTextField from '../../components/MyTextField';
import { signupSchema } from '../../utils/validators';
import { Paper, withStyles, Grid, Button } from '@material-ui/core';
import { Face, Fingerprint, Email } from '@material-ui/icons';
const styles = theme => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(),
  },
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = ({ classes }) => {
  const handleSubmit = values => {
    console.log(values);
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
        <form onSubmit={handleSubmit}>
          <Paper className={classes.padding}>
            <div className={classes.margin}>
              <Grid container spacing={8} alignItems="flex-end">
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
              <Grid container spacing={8} alignItems="flex-end">
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
              <Grid container spacing={8} alignItems="flex-end">
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
              <Grid container spacing={8} alignItems="flex-end">
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
              <Grid container spacing={8} alignItems="flex-end">
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
                <Button type="submit" variant="outlined" color="primary" style={{ textTransform: 'none' }}>
                  Sign Up
                </Button>
              </Grid>
            </div>
          </Paper>
        </form>
      )}
    </Formik>
  );
};

export default withStyles(styles)(SignUp);
