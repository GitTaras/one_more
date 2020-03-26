import React from 'react';
import StyledMessage from './StyledPost';
import { deleteChatMessage } from '../../store/messages/messagesActions';
import { connect } from 'react-redux';

function Post(props) {
  const { id, message, deleteMessage } = props;

  function onDelete() {
    deleteMessage(id);
  }

  return (
    <StyledMessage>
      <span className="itemDescription">{message}</span>
      <span className="closeButton" onClick={onDelete}>
        &times;
      </span>
    </StyledMessage>
  );
}

const mapDispatchToProps = dispatch => ({
  deleteMessage: id => dispatch(deleteChatMessage(id)),
});

export default connect(null, mapDispatchToProps)(Post);
