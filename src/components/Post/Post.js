import React from 'react';
import StyledMessage from './styled-post';
import { deleteChatMessage } from '../../store/messages/messagesActions';
import { connect } from 'react-redux';
import reactStringReplace from 'react-string-replace';

function Post(props) {
  const { id, message, deleteMessage } = props;

  function onDelete() {
    deleteMessage(id);
  }

  let messageWithLinks = '';
  // Match @-mentions
  messageWithLinks = reactStringReplace(message, /@(\w+)/g, (match, i) => (
    <a key={match + i} href={`https://twitter.com/${match}`}>
      @{match}
    </a>
  ));

  return (
    <StyledMessage>
      <span className="itemDescription">{messageWithLinks}</span>
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
