import React from 'react';
import MessageList from '../../components/PostsList/PostsList';
import Form from '../../components/PostForm/PostForm';
import Grid from '@material-ui/core/Grid';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import useAuthHook from '../../store/auth/useAuthHook';

const PostsListPage = () => {
  const location = useLocation();
  const searchObj = queryString.parse(location.search);
  const { currentUser } = useAuthHook();

  return (
    <Grid container direction={'row'} justify={'center'}>
      {(currentUser.username === searchObj.username ||
        searchObj.username === undefined ||
        searchObj.username === '') && (
        <Grid item sm={8}>
          <Form />
        </Grid>
      )}
      <Grid item sm={8}>
        <MessageList />
      </Grid>
    </Grid>
  );
};
export default PostsListPage;
