import React from 'react';
import StyledMessage from './styled-post';
import { deletePost } from '../../store/messages/messagesActions';
import { connect } from 'react-redux';
import reactStringReplace from 'react-string-replace';

function Post(props) {
  const { id, message, deletePost } = props;

  function onDelete() {
    deletePost(id);
  }

  let messageWithLinks = '';
  // Match @-mentions
  //  ^@(\w+)|(\s)@(\w+)
  //  ^@(\w+)|(\s)@(\w+)|@(\w+)
  //  (?<=\s)@(\w+)|^@(\w+)
  //debugger
  const allowedChars = [' ', '\n', undefined];

  messageWithLinks = reactStringReplace(message, /@(\w+)/gim, (match, i, offset) => {
    //console.log(match, i, offset, message[offset]);
    //debugger
    const wordPosition = offset + (i - 1) / 2;
    const firstChar = message[wordPosition]; // get '@'
    const charBeforeWord = message[wordPosition - 1];

    if (allowedChars.includes(charBeforeWord)) {
      return (
        <a key={match + i} href={`https://twitter.com/${match}`}>
          {firstChar + match}
        </a>
      );
    }

    return firstChar + match;
  });

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
  deletePost: id => dispatch(deletePost(id)),
});

export default connect(null, mapDispatchToProps)(Post);
