import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from 'components/Post';
import { List } from 'antd';
import StyledPostsList from './styled-posts-lists';
import { fetchPosts, clearPosts, clearPostsError } from 'store/posts/posts-actions';
import { withRouter } from 'react-router-dom';
import MuiAlert from 'components/UI/Alert';
import { Snackbar } from '@material-ui/core';

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.messagesStart = React.createRef();
    this.scroller = React.createRef();
    //this.username = '';
  }

  scrollToTop = () => {
    this.messagesStart.current.scrollIntoView({ behavior: 'auto' });
  };

  componentDidMount() {
    const { location, currentUser, match } = this.props;

    if (location.pathname === '/posts') {
      this.username = currentUser.username;
      this.props.fetchPosts(1, this.username, this.hashtag).then(({ data }) => {
        data.docs.length && this.scrollToTop();
      });

      return;
    }

    const subPath = location.pathname.split('/')[2];
    if (subPath === 'tags') {
      this.hashtag = match.params.tag;
    }

    if (subPath === 'users') {
      this.username =
        match.params.username === currentUser.username
          ? currentUser.username
          : match.params.username;
    }

    this.props.fetchPosts(1, this.username, this.hashtag).then(({ data }) => {
      data.docs.length && this.scrollToTop();
    });
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const reachedBottom =
      this.scroller.scrollHeight === this.scroller.scrollTop + this.scroller.clientHeight;
    if (
      prevProps.posts.length < this.props.posts.length &&
      this.scroller &&
      reachedBottom &&
      this.props.posts.length > this.props.limit
    ) {
      // console.log('save scroll');
      const scroller = this.scroller;
      return scroller.scrollHeight;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { match, currentUser, history } = this.props;

    if (prevProps.match.params !== match.params) {
      this.hashtag = match.params.tag ? match.params.tag : undefined;
      this.username = match.params.username ? match.params.username : undefined;

      if (this.username === currentUser.username) {
        return history.push('/posts');
      }

      this.props.clearPosts();
      return this.props.fetchPosts(1, this.username, this.hashtag).then(({ data }) => {
        data.docs.length && this.scrollToTop();
      });
    }

    //added new one post
    if (prevProps.posts.length < this.props.posts.length && !snapshot) {
      return this.scrollToTop();
    }
    //when delete message load more if the are some posts
    if (this.props.posts.length < this.props.limit && this.props.hasMore) {
      this.props.clearPosts();
      this.props.fetchPosts(1, this.username, this.hashtag);
    }
    //scroll to previous last element
    if (snapshot !== null) {
      const list = this.scroller;
      list.scrollTop = snapshot - list.clientHeight;
    }
  }

  componentWillUnmount() {
    this.props.clearPosts();
  }

  handleScroll = () => {
    const reachedBottom =
      this.scroller.scrollHeight === this.scroller.scrollTop + this.scroller.clientHeight;

    if (
      this.props.posts.length > this.props.limit - 1 &&
      reachedBottom &&
      this.props.hasMore &&
      !this.props.isLoading
    ) {
      // console.log('get more in handle scroll');
      this.props.fetchPosts(this.props.nextPage, this.username, this.hashtag);
    }
  };

  render() {
    const { posts, isLoading, isError, errorMessage, clearPostsError } = this.props;
    return (
      <StyledPostsList
        onScroll={this.handleScroll}
        ref={el => {
          this.scroller = el;
        }}
      >
        <List
          loading={isLoading}
          dataSource={posts}
          renderItem={(item, index) => (
            <>
              {!index && <div ref={this.messagesStart} />}
              <List.Item key={item.id}>
                <Post key={item.id} {...item} />
              </List.Item>
            </>
          )}
        />
        <Snackbar open={isError} autoHideDuration={6000} onClose={clearPostsError}>
          <MuiAlert severity="error">Error: {errorMessage}</MuiAlert>
        </Snackbar>
      </StyledPostsList>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  posts: state.posts.posts,
  hasMore: state.posts.hasMore,
  isError: state.posts.isError,
  errorMessage: state.posts.errorMessage,
  isLoading: state.posts.isLoading,
  limit: state.posts.limit,
  page: state.posts.page,
  nextPage: state.posts.nextPage,
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: (page, username, hashtag) => dispatch(fetchPosts(page, username, hashtag)),
  clearPosts: () => dispatch(clearPosts()),
  clearPostsError: () => dispatch(clearPostsError()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));
