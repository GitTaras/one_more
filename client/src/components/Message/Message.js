import React from 'react';
import styles from './Message.module.css';

function Message(props) {
  const { message } = props;
  return (
    <div className={styles.messageItem}>
      <span className={styles.itemDescription}>{message}</span>
    </div>
  );
}

export default Message;
