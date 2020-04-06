import React from 'react';
import {
  getAutocompleteUsers,
  getAutocompleteHashTags,
} from '../../store/autocomplete/autocompleteActions';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import '@webscopeio/react-textarea-autocomplete/style.css';

const AutocompleteHashtag = ({ entity: { hashtag } }) => <div>{hashtag}</div>;
const AutocompleteUsername = ({ entity: { username } }) => <div>{username}</div>;
const AutocompleteLoading = () => <div>Loading ...</div>;

const AutocompleteTextArea = props => {
  const autocompleteHashDataProvider = async searchStr => {
    return await getAutocompleteHashTags(searchStr);
  };

  const autocompleteUsernameDataProvider = async searchStr => {
    return await getAutocompleteUsers(searchStr);
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
