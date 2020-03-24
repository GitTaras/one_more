import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from '../Message/Message';
import { List } from 'antd';
import styles from './MessageList.module.css';
import { getChatMessages } from '../../store/messages/messagesActions';
import { cleanChat } from '../../store/messages/messagesActions';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.messagesStart = React.createRef();
    this.scroller = React.createRef();
  }

  scrollToTop = () => {
    this.messagesStart.current.scrollIntoView({ behavior: 'auto' });
  };

  componentDidMount() {
    this.props.getChatMessages().then(({ data }) => {
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
    if (
      prevProps.messages.length < this.props.messages.length &&
      !snapshot
    ) {
      return this.scrollToTop();
    }

    if (this.props.isError) {
      alert(`Error: ${this.props.errorMessage}`);
    }
    //when delete message load more if the are some messages
    if (this.props.messages.length < this.props.limit && this.props.hasMore) {
      this.props.cleanChat();
      this.props.getChatMessages();
    }
    //scroll to previous last element
    if (snapshot !== null) {
      const list = this.scroller;
      list.scrollTop = snapshot - list.clientHeight;
    }
  }

  componentWillUnmount() {
    this.props.cleanChat();
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
      this.props.getChatMessages(this.props.nextPage);
    }
  };

  render() {
    const { messages, isLoading } = this.props;
    return (
      <div
        className={styles.container}
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
                <Message key={item.id} {...item} />
              </List.Item>
            </>
          )}
        />
      </div>
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
  getChatMessages: page => dispatch(getChatMessages(page)),
  cleanChat: () => dispatch(cleanChat()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
