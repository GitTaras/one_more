import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from '../Message/Message';
import { getChatMessagesThunk } from '../../thunks/index';

class MessageList extends Component {
  componentDidMount() {
    this.props.getChatMessages();
  }

  render() {
    const { messages, error, etext, isLoading } = this.props;

    return (
      <>
        {isLoading && <div>loading</div>}
        {error && alert(`Error: ${etext}`)}
        {!isLoading &&
          !error &&
          messages.map(m => <Message key={m.id} {...m} />)}
      </>
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
