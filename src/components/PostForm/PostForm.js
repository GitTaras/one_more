import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { postSchema } from '../../utils/validators';
import { Input } from '../UI/Input/Input';
import { Button } from 'antd';
import { postChatMessage } from '../../store/messages/messagesActions';
import styles from './PostForm.module.css';
import Autocomplete from 'react-autocomplete';

const PostForm = ({ isLoading, post }) => {
  const [mentions, setMentions] = useState([]);
  const [isOpenAutocomplete, setOpenAutocomplete] = useState(false);

  const handleSubmit = values => {
    if (!isLoading) {
      post({ message: values.message });
    }
  };

  const getMentions = () =>
    new Promise((resolve, reject) =>
      setTimeout(() => resolve([{ label: 'apple' }, { label: 'banana' }, { label: 'pear' }]), 200)
    );

  const getMentionsR = () => {
    getMentions().then(data => setMentions(data));
  };

  const checkForMentions = (value) => {
    //todo write correct reg exp for @
    if ( value.match(/(^@.\w+)/) ) {
      console.log('open');
      setOpenAutocomplete(true);
      getMentionsR();
      return;
    };
    console.log('close');
    setOpenAutocomplete(false);
  }


  const renderMyInput = props => {
    return (
      <div>
        <input
          name="message"
          type="text"
          placeholder="type your message"
          maxLength={250}
          {...props}
        />
      </div>
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
              isOpen={false}
              renderInput={renderMyInput}
              autoFocus={true}
              getItemValue={item => item.label}
              items={mentions}
              renderItem={(item, isHighlighted) => (
                <div key={item.label} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                  {item.label}
                </div>
              )}
              value={values.message}
              onChange={e => {
                handleChange(e);
                checkForMentions(e.target.value);
              }}
              onSelect={mantion => setFieldValue('message', values.message.concat(mantion), false)}
              open={isOpenAutocomplete}
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
