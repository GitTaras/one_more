import React from 'react';
import {
  getAutocompleteUsers,
  getAutocompleteHashTags,
} from 'store/autocomplete/autocomplete-actions';
import { useDispatch } from 'react-redux';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import '@webscopeio/react-textarea-autocomplete/style.css';

const AutocompleteHashtag = ({ entity: { hashtag } }) => <div>{hashtag}</div>;
const AutocompleteUsername = ({ entity: { username } }) => <div>{username}</div>;
const AutocompleteLoading = () => <div>Loading ...</div>;

const AutocompleteTextArea = props => {
  const dispatch = useDispatch();

  const autocompleteHashDataProvider = async searchString => {
    return dispatch(getAutocompleteHashTags(searchString))
      .then(({ data }) => data)
      .catch(() => []);
  };

  const autocompleteUsernameDataProvider = async searchString => {
    return dispatch(getAutocompleteUsers(searchString))
      .then(({ data }) => data)
      .catch(() => []);
  };

  const autocompleteTriggers = {
    '#': {
      component: AutocompleteHashtag,
      dataProvider: autocompleteHashDataProvider,
      output: ({ hashtag }) => `#${hashtag}`,
    },
    '@': {
      component: AutocompleteUsername,
      dataProvider: autocompleteUsernameDataProvider,
      output: ({ username }) => `@${username}`,
    },
  };

  const { value, name, error, onKeyDown, onChange } = props;

  return (
    <div className={'textareaContainer'}>
      <ReactTextareaAutocomplete
        className={error ? 'textAreaDanger' : ''}
        loadingComponent={AutocompleteLoading}
        onChange={onChange}
        rows="3"
        value={value}
        trigger={autocompleteTriggers}
        minChar={1}
        name={name}
        maxLength={200}
        onKeyDown={onKeyDown}
      />
      {error && <span className={'postMessageFieldError'}>{error}</span>}
    </div>
  );
};

export default AutocompleteTextArea;
