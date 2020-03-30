import React from 'react';
import moment from 'moment';
import StyledMessage from './styled-post';
import { deletePost } from '../../store/messages/messagesActions';
import { connect } from 'react-redux';
import reactStringReplace from 'react-string-replace';
import { Avatar, IconButton, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

function Post(props) {
  const { id, message, createdAt, deletePost, author, currentUserId } = props;

  function onDelete() {
    deletePost(id);
  }

  let messageWithLinks = '';
  const allowedChars = [' ', '\n', undefined];

  messageWithLinks = reactStringReplace(message, /@(\w+)/gim, (match, i, offset) => {
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
      {author.avatar ? (
        <IconButton>
          <Avatar alt="Remy Sharp" srcSet={author.avatar} src={author.avatar} />
        </IconButton>
      ) : (
        <AccountCircle />
      )}
      <div className="postBody">
        <div className="postBodyHeading">
          <div className="postMeta">
            <Typography
              variant="h6"
              className="postAuthor"
              component="p"
              noWrap={true}
              gutterBottom
            >
              {author.fullName}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {moment(createdAt, moment.ISO_8601).format('MMMM Do YYYY')}
            </Typography>
          </div>
          {currentUserId === author.id && (
            <span className="closeButton" onClick={onDelete}>
              &times;
            </span>
          )}
        </div>
        <div className="message">{messageWithLinks}</div>
      </div>
    </StyledMessage>
  );
}

const mapDispatchToProps = dispatch => ({
  deletePost: id => dispatch(deletePost(id)),
});

const mapStateToProps = store => ({
  currentUserId: store.auth.currentUser.id,
});

export default connect(null, mapDispatchToProps)(Post);
