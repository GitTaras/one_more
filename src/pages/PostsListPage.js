import React from 'react';
import PostsList from 'components/PostsList';
import Grid from '@material-ui/core/Grid';
import withLayout from 'components/Hocs/withLayout';

const PostsListPage = () => (
  <Grid container direction={'row'} justify={'center'}>
    <Grid item sm={8}>
      <PostsList />
    </Grid>
  </Grid>
);

export default withLayout(PostsListPage);
