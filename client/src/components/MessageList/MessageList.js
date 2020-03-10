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
    this.messagesEnd = React.createRef();
    this.scroller = React.createRef();
  }

  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({ behavior: 'auto' });
  };

  componentDidMount() {
    this.props.getChatMessages().then(() => {
      this.scrollToBottom();
    });
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (
      prevProps.messages.length !== this.props.messages.length &&
      this.scroller &&
      this.scroller.scrollTop < 50
    ) {
      const scroller = this.scroller;
      return scroller.scrollHeight;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.messages.length < this.props.messages.length &&
      !snapshot &&
      this.scroller.scrollTop >= 30
    ) {
      return this.scrollToBottom();
    }

    if (this.props.isError) {
      alert(`Error: ${this.props.errorMessage}`);
    }

    if (this.props.messages.length < this.props.limit && this.props.hasMore) {
      this.props.cleanChat();
      this.props.getChatMessages();
    }

    if (snapshot !== null) {
      const list = this.scroller;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  handleScroll = () => {
    if (
      this.props.messages.length > this.props.limit - 1 &&
      this.scroller.scrollTop <= 25 &&
      this.props.hasMore &&
      !this.props.isLoading
    ) {
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
          renderItem={item => (
            <List.Item key={item.id}>
              <Message key={item.id} {...item} />
            </List.Item>
          )}
        >
          <div ref={this.messagesEnd} />
        </List>
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
