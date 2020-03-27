import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { postSchema } from '../../utils/validators';
import { Button } from 'antd';
import { postMessage } from '../../store/messages/messagesActions';
import StyledPostForm from './styled-post-form.js';
import AutocompleteTextArea from '../AutocompleteTextArea/AutocompleteTextArea';

const PostForm = values => {
  const { isLoading, post } = values;
  const handleSubmit = values => {
    if (!isLoading) {
      return post({ message: values.message });
    }
  };

  return (
    <StyledPostForm>
      <Formik
        initialValues={{ message: '' }}
        validationSchema={postSchema}
        onSubmit={(values, { resetForm, setErrors }) => {
          handleSubmit(values).then(() => {
            resetForm({});
            setErrors({});
          });
          // resetForm({});
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <AutocompleteTextArea
              value={values.message}
              onChange={handleChange}
              error={errors.message}
              name="message"
            />
            <div className="postSubmitContainer">
              <Button htmlType="submit" type="primary" size="large" loading={isLoading}>
                Post
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </StyledPostForm>
  );
};

const mapStateToProps = store => ({
  isLoading: store.messages.isLoading,
});

const mapDispatchToProps = dispatch => ({
  post: message => dispatch(postMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
