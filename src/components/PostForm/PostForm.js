import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { postSchema } from '../../utils/validators';
import { Button } from 'antd';
import { postChatMessage } from '../../store/messages/messagesActions';
import styles from './PostForm.module.css';
import { getAutocompleteUsers } from '../../store/autocomplete/autocompleteActions';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import '@webscopeio/react-textarea-autocomplete/style.css';

const AutocompleteItem = ({ entity: { username } }) => <div>{username}</div>;
const AutocompleteLoading = () => <div>Loading ...</div>;

const AutocompleteTextArea = props => {
  const autocompleteUsernameDataProvider = async searchStr => {
    return await getAutocompleteUsers(searchStr);
  };

  const textAreaChangeHandler = (e) => {
    props.onChange(e);
  }

  const autocompleteTriggers = {
    '@': {
      component: AutocompleteItem,
      dataProvider: autocompleteUsernameDataProvider,
      output: ({ username }) => `@${username}`,
    },
  };

  const { value, name } = props;

  return (
    <ReactTextareaAutocomplete
      loadingComponent={AutocompleteLoading}
      onChange={textAreaChangeHandler}
      rows="5"
      value={value}
      trigger={autocompleteTriggers}
      minChar={2}
      name={name}
    />
  );
};

const PostForm = ({ isLoading, post }) => {
  const handleSubmit = values => {
    if (!isLoading) {
      post({ message: values.message });
    }
  };

  return (
    <>
      <Formik
        initialValues={{ message: '' }}
        validationSchema={postSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm({});
        }}
      >
        {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
          <form onSubmit={handleSubmit} className={styles.chatForm}>
            <AutocompleteTextArea
              value={values.message}
              onChange={handleChange}
              error={errors.message}
              name="message"
            />
            <div>
              <Button htmlType="submit" type="primary" size="large" loading={isLoading}>
                Post
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

const mapStateToProps = store => ({
  isLoading: store.messages.isLoading,
});

const mapDispatchToProps = dispatch => ({
  post: message => dispatch(postChatMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
