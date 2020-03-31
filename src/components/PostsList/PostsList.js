import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from '../Post/Post';
import { List } from 'antd';
import StyledPostsList from './styled-posts-lists';
import { getPosts, cleanPosts } from '../../store/messages/messagesActions';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.messagesStart = React.createRef();
    this.scroller = React.createRef();
    this.searchObj = null;
  }

  scrollToTop = () => {
    this.messagesStart.current.scrollIntoView({ behavior: 'auto' });
  };

  componentDidMount() {
    this.searchObj = queryString.parse(this.props.location.search);

    this.props.getPosts(1, this.searchObj.username).then(({ data }) => {
      data.docs.length && this.scrollToTop();
    });
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const reachedBottom =
      this.scroller.scrollHeight === this.scroller.scrollTop + this.scroller.clientHeight;
    if (
      prevProps.messages.length < this.props.messages.length &&
      this.scroller &&
      reachedBottom &&
      this.props.messages.length > this.props.limit
    ) {
      // console.log('save scroll');
      const scroller = this.scroller;
      return scroller.scrollHeight;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //added new one post
    if (prevProps.messages.length < this.props.messages.length && !snapshot) {
      return this.scrollToTop();
    }

    if (this.props.isError) {
      alert(`Error: ${this.props.errorMessage}`);
    }
    //when delete message load more if the are some messages
    if (this.props.messages.length < this.props.limit && this.props.hasMore) {
      this.props.cleanPosts();
      this.props.getPosts(1, this.searchObj.username);
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
      this.props.messages.length > this.props.limit - 1 &&
      reachedBottom &&
      this.props.hasMore &&
      !this.props.isLoading
    ) {
      // console.log('get more in handle scroll');
      this.props.getPosts(this.props.nextPage, this.searchObj.username);
    }
  };

  render() {
    const { messages, isLoading } = this.props;
    return (
      <StyledPostsList
        onScroll={this.handleScroll}
        ref={el => {
          this.scroller = el;
        }}
      >
        <List
          loading={isLoading}
          dataSource={messages}
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
  messages: state.messages.messages,
  hasMore: state.messages.hasMore,
  isError: state.messages.isError,
  errorMessage: state.messages.errorMessage,
  isLoading: state.messages.isLoading,
  limit: state.messages.limit,
  page: state.messages.page,
  nextPage: state.messages.nextPage,
});

const mapDispatchToProps = dispatch => ({
  getPosts: (page, username) => dispatch(getPosts(page, username)),
  cleanPosts: () => dispatch(cleanPosts()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));
