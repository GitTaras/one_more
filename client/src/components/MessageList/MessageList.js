import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from '../Message/Message';
import styles from './MessageList.module.css';
import { getChatMessagesThunk } from '../../thunks/index';

class MessageList extends Component {
  constructor(props) {
    super(props);
    const messagesEnd = React.createRef();
    const scroller = React.createRef();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.props.getChatMessages();
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleScroll = () => {
    console.dir(this.scroller);
    if (this.scroller.scrollTop < 60 ) {
      //this.props.getChatMessages();
    }
  }

  render() {
    const { messages, error, etext, isLoading } = this.props;
    console.log("r");
    return (
      <div className = {styles.container} onScroll={this.handleScroll} ref={(el) => { this.scroller = el; }}>
        {isLoading && <div>loading</div>}
        {error && alert(`Error: ${etext}`)}
        {!isLoading &&
          !error &&
          messages.map(m => <Message key={m.id} {...m} />)}
          <div ref={(el) => { this.messagesEnd = el; }} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages.messages,
  error: state.messages.error,
  etext: state.messages.etext,
  isLoading: state.messages.isLoading,
});

const mapDispatchToProps = dispatch => ({
  getChatMessages: () => dispatch(getChatMessagesThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
