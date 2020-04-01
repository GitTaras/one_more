import React from 'react';
import PostsList from '../../components/PostsList/PostsList';
import Form from '../../components/PostForm/PostForm';
import Grid from '@material-ui/core/Grid';

const Home = () => (
  <Grid container direction={'row'} justify={'center'}>
    <Grid item sm={8}>
      <Form />
    </Grid>
    <Grid item sm={8}>
      <PostsList />
    </Grid>
  </Grid>
);

export default Home;
