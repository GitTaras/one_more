import React from 'react';
import styles from './Message.module.css';
import { deleteChatMessage } from '../../store/messages/messagesActions';
import { connect } from 'react-redux';

function Message(props) {
  const { id, message, deleteMessage } = props;

  function onDelete() {
    deleteMessage(id);
  }

  return (
    <div className={styles.messageItem}>
      <span className={styles.itemDescription}>{message}</span>
      <span className={styles.closeButton} onClick={onDelete}>
        &times;
      </span>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  deleteMessage: id => dispatch(deleteChatMessage(id)),
});

export default connect(null, mapDispatchToProps)(Message);
