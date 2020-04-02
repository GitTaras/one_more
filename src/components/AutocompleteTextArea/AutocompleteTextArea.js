import React from 'react';
import { getAutocompleteUsers, getAutocompleteHashTags } from '../../store/autocomplete/autocompleteActions';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import '@webscopeio/react-textarea-autocomplete/style.css';

const AutocompleteItem = ({ entity: { username } }) => <div>{username}</div>;
const AutocompleteLoading = () => <div>Loading ...</div>;

const AutocompleteTextArea = props => {
  const autocompleteHashDataProvider = async searchStr => {
    return await getAutocompleteHashTags(searchStr);
  }

  const autocompleteUsernameDataProvider = async searchStr => {
    return await getAutocompleteUsers(searchStr);
  };

  const textAreaChangeHandler = e => {
    props.onChange(e);
  };

  const autocompleteTriggers = {
    // '#': {
    //   component: AutocompleteItem,
    //   dataProvider: autocompleteHashDataProvider,
    //   output: (word) => `#${word}`,
    // },
    '@': {
      component: AutocompleteItem,
      dataProvider: autocompleteUsernameDataProvider,
      output: ({ username }) => `@${username}`,
    },
  };

  const { value, name, error } = props;

  return (
    <div className={'textareaContainer'}>
      <ReactTextareaAutocomplete
        className={error ? 'textAreaDanger' : ''}
        loadingComponent={AutocompleteLoading}
        onChange={textAreaChangeHandler}
        rows="3"
        value={value}
        trigger={autocompleteTriggers}
        minChar={1}
        name={name}
        maxLength={200}
      />
      {error && <span className={'postMessageFieldError'}>{error}</span>}
    </div>
  );
};

export default AutocompleteTextArea;
