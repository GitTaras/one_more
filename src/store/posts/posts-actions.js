export const CLEAR_POSTS = 'CLEAR_POSTS';
export const cleanPosts = () => ({
  type: CLEAR_POSTS,
});

export const FETCH_POSTS = 'FETCH_POSTS';
export const fetchPosts = (page = 1, username = '', hashTag = '') => dispatch => {
  return dispatch({
    type: FETCH_POSTS,
    request: {
      url: `/posts/${username}?page=${page}&hash_tag=${hashTag}`,
    },
    meta: {
      asPromise: true,
    },
  });
};

export const CREATE_POST = 'CREATE_POST';
export const createPost = postData => dispatch => {
  return dispatch({
    type: CREATE_POST,
    request: {
      url: '/posts',
      data: postData,
      method: 'post',
    },
    meta: {
      asPromise: true,
    },
  });
};

export const DELETE_POST = 'DELETE_POST';
export const deletePost = id => (dispatch, getState) => {
  //TODO MOVE FILTER TO REDUCER
  const posts = getState().posts.posts.filter(post => post.id !== id);
  dispatch({
    type: DELETE_POST,
    request: {
      url: `/posts/${id}`,
      method: 'delete',
    },
    meta: {
      posts,
    },
  });
};
