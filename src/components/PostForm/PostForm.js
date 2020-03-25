import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { postSchema } from '../../utils/validators';
import { Button } from 'antd';
import { postChatMessage } from '../../store/messages/messagesActions';
import styles from './PostForm.module.css';
import Autocomplete from 'react-autocomplete';
import { getAutocompleteUsers } from '../../store/autocomplete/autocompleteActions';
import inputStyle from '../UI/Input/Input.module.css';

const PostForm = ({ isLoading, post }) => {
  const [mentions, setMentions] = useState([]);
  const [isOpenAutocomplete, setOpenAutocomplete] = useState(false);

  const handleSubmit = values => {
    if (!isLoading) {
      post({ message: values.message });
    }
  };

  const getMentions = async name => {
    const usernames = await getAutocompleteUsers(name);
    setMentions(usernames);
  };

  const checkForMentions = value => {
    //todo write correct reg exp for @
    const names = value.match(/(^@.\w+)/);
    if (names) {
      setOpenAutocomplete(true);
      getMentions(names[0].substring(1));
      return;
    }
    setOpenAutocomplete(false);
  };

  const renderMyInput = props => {
    const { error } = props;
    return (
      <>
        <input
          className={error ? inputStyle.inputDanger : ''}
          name="message"
          type="text"
          id="message"
          placeholder="type your message"
          maxLength={250}
          {...props}
        />
        {error && <span className={inputStyle.error}>{error}</span>}
      </>
    );
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
            <Autocomplete
              wrapperProps={{ className: styles.inputContainer }}
              wrapperStyle={{ display: 'flex', width: '80%' }}
              isOpen={false}
              renderInput={renderMyInput}
              autoFocus={true}
              getItemValue={item => item.username}
              inputProps={{
                error: errors.message,
              }}
              items={mentions}
              renderItem={(item, isHighlighted) => (
                <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                  {item.username}
                </div>
              )}
              value={values.message}
              onChange={e => {
                handleChange(e);
                checkForMentions(e.target.value);
              }}
              onSelect={mantion => setFieldValue('message', values.message.concat(mantion), false)}
              open={isOpenAutocomplete}
              error={errors.message}
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
