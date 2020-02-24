import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from '../Input/Input';
import { postChatMessageThunk } from '../../thunks/index';
import styles from './Form.module.css';

const errorState = {
  emptyError: {
    status: false,
    message: 'type message',
  },
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      ...errorState,
    };
  }

  onChange = ({ target }) => {
    const value = target.value;
    this.setState({ [target.name]: value });
  };

  validation = ({ target }) => {
    const { value } = target;

    this.setState({
      emptyError: {
        ...this.state.emptyError,
        status: value.trim().length === 0,
      },
    });
  };

  get disableButton() {
    return this.state.emptyError.status;
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.post({ id: Date.now().toString(), message: this.state.message });
    this.setState({ message: '' });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className={styles.chatForm}>
          <Input
            name="message"
            type="text"
            value={this.state.message}
            placeholder="type your message"
            autoFocus={true}
            onChange={this.onChange}
            onBlur={this.validation}
            error={this.state.emptyError}
            required={true}
          />
          <div>
            <button
              type="submit"
              disabled={this.disableButton}
              className={styles.buttomPost}
            >
              Post
            </button>
          </div>
        </form>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  post: message => dispatch(postChatMessageThunk(message)),
});

export default connect(null, mapDispatchToProps)(Form);
