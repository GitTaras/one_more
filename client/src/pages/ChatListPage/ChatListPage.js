import React from 'react';
import MessageList from '../../components/MessageList/MessageList';
import Form from '../../components/PostForm/PostForm';
import styles from '../../App.module.css';

const ChatListPage = () => (
  <div className={styles.container}>
    <MessageList />
    <Form />
  </div>
);
export default ChatListPage;