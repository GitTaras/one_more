import React from 'react';
import styles from './Message.module.css';
import { deleteChatMessage } from '../../store/messages/actionCreators';
// import { deleteChatMessageThunk } from '../../thunks/index';
import { connect } from 'react-redux';

function Message(props) {
  const { id, message, deleteMessage } = props;

  function onDelete() {
    deleteMessage(id);
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
  // deleteMessage: id => dispatch(deleteChatMessageThunk(id)),
  deleteMessage: id => dispatch(deleteChatMessage(id)),
});

export default connect(null, mapDispatchToProps)(Message);
