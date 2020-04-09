import React from 'react';
import PostsList from 'components/PostsList';
import PostForm from 'components/PostForm';
import Grid from '@material-ui/core/Grid';
import withLayout from 'components/Hocs/withLayout';

const Home = () => (
  <Grid container direction={'row'} justify={'center'}>
    <Grid item sm={8}>
      <PostForm />
    </Grid>
    <Grid item sm={8}>
      <PostsList />
    </Grid>
  </Grid>
);

//export default Home;
export default withLayout(Home);
