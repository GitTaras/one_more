import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from '../Post/Post';
import { List } from 'antd';
import StyledPostsList from './styled-posts-lists';
import { getPosts, cleanPosts } from '../../store/posts/postsActions';
import { withRouter } from 'react-router-dom';

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
    //debugger
    const pathprefix = location.pathname.split('/')[1];

    if (pathprefix === 'tags') {
      this.hashTag = match.params.tag;
    } else {
      this.username = location.pathname === '/posts' ? currentUser.username : match.params.username;
    }

    this.props.getPosts(1, this.username, this.hashTag).then(({ data }) => {
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
    //added new one post
    if (prevProps.posts.length < this.props.posts.length && !snapshot) {
      return this.scrollToTop();
    }

    if (this.props.isError) {
      alert(`Error: ${this.props.errorMessage}`);
    }
    //when delete message load more if the are some posts
    if (this.props.posts.length < this.props.limit && this.props.hasMore) {
      this.props.cleanPosts();
      this.props.getPosts(1, this.username, this.hashTag);
    }
    //scroll to previous last element
    if (snapshot !== null) {
      const list = this.scroller;
      list.scrollTop = snapshot - list.clientHeight;
    }
  }

  componentWillUnmount() {
    this.props.cleanPosts();
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
      this.props.getPosts(this.props.nextPage, this.username, this.hashTag);
    }
  };

  render() {
    const { posts, isLoading } = this.props;
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
  getPosts: (page, username, hashTag) => dispatch(getPosts(page, username, hashTag)),
  cleanPosts: () => dispatch(cleanPosts()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));
