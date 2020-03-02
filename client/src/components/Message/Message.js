import React from 'react';
import styles from './Message.module.css';
import { deleteChatMessage } from '../../store/messages/actions';
import { connect } from 'react-redux';

function Message(props) {
  const { _id, message, deleteMessage } = props;

  function onDelete() {
    deleteMessage(_id);
  }

  return (
    <div className={styles.messageItem}>
      <span className={styles.closeButton} onClick={onDelete}>
        &times;
      </span>
      <span className={styles.itemDescription}>{message}</span>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  deleteMessage: id => dispatch(deleteChatMessage(id)),
});

export default connect(null, mapDispatchToProps)(Message);
