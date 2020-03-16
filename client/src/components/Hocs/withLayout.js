import { Container, Grid } from '@material-ui/core';
import React from 'react';
import Header from '../Header/Header';

export default Component => props => (
  <Container>
    <Grid container spacing={2}>
      <Header />
      <Grid container item justify="center" alignItems="center">
        <Component {...props} />
      </Grid>
    </Grid>
  </Container>
);
