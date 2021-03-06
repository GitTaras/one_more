import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import reactStringReplace from 'react-string-replace';
import { Avatar, IconButton, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { useHistory, Link } from 'react-router-dom';
import StyledMessage from './styled-post';
import { deletePost } from 'store/posts/posts-actions';

function Post(props) {
  const { id, message, createdAt, deletePost, author, currentUser } = props;
  const history = useHistory();

  function onDelete() {
    deletePost(id);
  }

  let messageWithLinks = '';
  const allowedChars = [' ', '\n', undefined];

  messageWithLinks = reactStringReplace(message, /[@|#](\w+)/gim, (match, i, offset) => {
    const wordPosition = offset + (i - 1) / 2;
    const firstChar = message[wordPosition]; // get '@' or '#'
    const charBeforeWord = message[wordPosition - 1];

    if (allowedChars.includes(charBeforeWord)) {
      return firstChar === '@' ? (
        <Link
          key={match + i}
          to={currentUser.username === match ? `/posts` : `/posts/users/${match}`}
        >
          {firstChar + match}
        </Link>
      ) : (
        <Link key={match + i} to={`/posts/tags/${match.toLowerCase()}`}>
          {firstChar + match}
        </Link>
      );
    }

    return firstChar + match;
  });

  function handleAvatarClick() {
    currentUser.id === author.id
      ? history.push('/posts')
      : history.push(`/posts/users/${author.username}`);
  }

  return (
    <StyledMessage>
      {author.avatar ? (
        <IconButton onClick={handleAvatarClick}>
          <Avatar
            alt={author.username}
            srcSet={
              author.avatar.startsWith('http')
                ? author.avatar
                : `http://localhost:8000${author.avatar}`
            }
            src={
              author.avatar.startsWith('http')
                ? author.avatar
                : `http://localhost:8000${author.avatar}`
            }
          />
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
              {author.username}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {moment(createdAt, moment.ISO_8601).format('MMMM Do YYYY')}
            </Typography>
          </div>
          {currentUser.id === author.id && (
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
  currentUser: store.auth.currentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
