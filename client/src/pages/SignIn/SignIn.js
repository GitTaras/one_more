import React from 'react';
import MyTextField from '../../components/MyTextField';
import { Paper, withStyles, Grid, Button } from '@material-ui/core';
import { Email, Fingerprint } from '@material-ui/icons';
import { Formik, Field } from 'formik';
import { signinSchema } from '../../utils/validators';

const styles = theme => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(),
  },
});

const initialValues = {
  email: '',
  password: '',
};

const SignIn = ({ classes }) => {
  const handleSubmit = values => {
    console.log(values);
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
              <Grid container justify="center" style={{ marginTop: '10px' }}>
                <Button variant="outlined" color="primary" style={{ textTransform: 'none' }}>
                  Login
                </Button>
              </Grid>
            </div>
          </Paper>
        </form>
      )}
    </Formik>
  );
};

export default withStyles(styles)(SignIn);
