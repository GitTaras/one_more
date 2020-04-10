import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { postSchema } from 'validation/index';
import { Button } from 'antd';
import { createPost } from 'store/posts/posts-actions';
import StyledPostForm from './styled-post-form.js';
import AutocompleteTextArea from './AutocompleteTextArea';

const PostForm = props => {
  const { isLoading, createPost } = props;
  const handleSubmit = async values => {
    if (!isLoading) {
      const hashtags = values.message.match(/(?<=\s)#(\w+)|^#(\w+)/gim);
      const withoutSharp = hashtags
        ? hashtags.map(item => item.slice(1, item.length).toLowerCase())
        : [];
      return createPost({ message: values.message, hashtags: withoutSharp });
    }
  };

  return (
    <StyledPostForm>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{ message: '' }}
        validationSchema={postSchema}
        onSubmit={(values, { resetForm, setErrors }) => {
          handleSubmit(values)
            .then(() => {
              resetForm();
              setErrors({});
            })
            .catch();
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <AutocompleteTextArea
              value={values.message}
              onChange={handleChange}
              onKeyDown={e => e.ctrlKey && e.key === 'Enter' && handleSubmit()}
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
  isLoading: store.posts.isLoading,
});

const mapDispatchToProps = dispatch => ({
  createPost: postData => dispatch(createPost(postData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
