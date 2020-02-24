import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from '../Message/Message';
import styles from './MessageList.module.css';
import { getChatMessagesThunk } from '../../thunks/index';

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
    this.props.getChatMessages();
    setTimeout(this.scrollToBottom, 50);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (
      prevProps.messages.length !== this.props.messages.length &&
      this.scroller &&
      this.scroller.scrollTop < 10
    ) {
      const scroller = this.scroller;
      return scroller.scrollHeight;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      const list = this.scroller;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  handleScroll = () => {
    if (
      this.props.messages.length > 9 &&
      this.scroller.scrollTop < 5 &&
      this.props.hasMore
    ) {
      
      this.debounce(
        this.props.getChatMessages(this.props.messages.length),
        1000
      );
    }
  };

  debounce(f, ms) {
    let isCooldown = false;

    return function() {
      if (isCooldown) return;

      f.apply(this, arguments);
      isCooldown = true;
      setTimeout(() => (isCooldown = false), ms);
    };
  }

  render() {
    const { messages, error, etext, isLoading } = this.props;
    return (
      <div
        className={styles.container}
        onScroll={this.handleScroll}
        ref={el => {
          this.scroller = el;
        }}
      >
        {isLoading && <div>loading</div>}
        {error && alert(`Error: ${etext}`)}
        {!isLoading &&
          !error &&
          messages.map(m => <Message key={m.id} {...m} />)}
        <div ref={this.messagesEnd} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages.messages,
  hasMore: state.messages.hasMore,
  error: state.messages.error,
  etext: state.messages.etext,
  isLoading: state.messages.isLoading,
});

const mapDispatchToProps = dispatch => ({
  getChatMessages: offset => dispatch(getChatMessagesThunk(offset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
