import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { postSchema } from '../../utils/validators';
import { Input } from '../UI/Input/Input';
import { Button } from 'antd';
import { postChatMessage } from '../../store/messages/messagesActions';
import styles from './PostForm.module.css';

const PostForm = ({ isLoading, post }) => {
  const handleSubmit = values => {
    if (!isLoading) {
      post({ message: values.message });
    }
  };

  return (
    <Formik
      initialValues={{ message: '' }}
      validationSchema={postSchema}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm({});
      }}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <form onSubmit={handleSubmit} className={styles.chatForm}>
          <Input
            name="message"
            type="text"
            value={values.message}
            placeholder="type your message"
            autoFocus={true}
            onChange={handleChange}
            error={errors.message}
            maxLength={250}
          />
          <div>
            <Button htmlType="submit" type="primary" size="large" loading={isLoading}>
              Post
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

const mapStateToProps = store => ({
  isLoading: store.messages.isLoading,
});

const mapDispatchToProps = dispatch => ({
  post: message => dispatch(postChatMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
