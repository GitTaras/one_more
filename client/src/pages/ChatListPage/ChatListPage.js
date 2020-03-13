import React from 'react';
import MessageList from '../../components/MessageList/MessageList';
import Form from '../../components/PostForm/PostForm';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';

const ChatListPage = () => (
  <Grid container direction={'row'} justify={'center'}>
    <Grid item sm={8}>
      <MessageList />
    </Grid>
    <Grid item sm={8}>
      <Form />
    </Grid>
  </Grid>
);
export default ChatListPage;
