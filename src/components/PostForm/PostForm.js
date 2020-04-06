import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { postSchema } from '../../utils/validators';
import { Button } from 'antd';
import { post } from '../../store/posts/postsActions';
import StyledPostForm from './styled-post-form.js';
import AutocompleteTextArea from '../AutocompleteTextArea/AutocompleteTextArea';

const PostForm = props => {
  const { isLoading, post } = props;
  const handleSubmit = values => {
    if (!isLoading) {
      const hashTags = values.message.match(/(?<=\s)#(\w+)|^#(\w+)/gim);
      const withoutSharp = hashTags ? hashTags.map(item => item.slice(1, item.length)) : [];
      return post({ message: values.message, hashtags: withoutSharp });
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
  post: postData => dispatch(post(postData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
