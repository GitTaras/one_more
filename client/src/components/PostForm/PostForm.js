import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from '../Input/Input';
import { postChatMessage } from '../../store/messages/actions';
import styles from './PostForm.module.css';

const errorState = {
  emptyError: {
    status: false,
    message: 'type message',
  },
};

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      ...errorState,
    };
  }

  onChange = ({ target }) => {
    const value = target.value;
    this.setState({ [target.name]: value }, () => this.validation({ target }));
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
    return this.state.emptyError.status || this.props.isLoading;
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
            maxLength={200}
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

const mapStateToProps = store => ({
  isLoading: store.messages.isLoading,
});

const mapDispatchToProps = dispatch => ({
  post: message => dispatch(postChatMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
