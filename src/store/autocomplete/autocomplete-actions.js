export const GET_AUTOCOMPLETE_USERS = 'GET_AUTOCOMPLETE_USERS';
export const getAutocompleteUsers = name => ({
  type: GET_AUTOCOMPLETE_USERS,
  request: {
    url: `/users/autocomplete/${name}`,
  },
  meta: {
    asPromise: true,
  },
});

export const GET_AUTOCOMPLETE_HASHTAGS = 'GET_AUTOCOMPLETE_HASHTAGS';
export const getAutocompleteHashTags = hashtag => ({
  type: GET_AUTOCOMPLETE_HASHTAGS,
  request: {
    url: `/hash-tags/autocomplete/${hashtag}`,
  },
  meta: {
    asPromise: true,
  },
});
