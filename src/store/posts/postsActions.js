import ACTION from '../constants';
import { restURL } from '../../utils/baseURL';

export const cleanPosts = () => ({
  type: ACTION.CLEAN_POSTS,
});

export const getPosts = (page = 1, username = '', hashTag = '') => dispatch => {
  return dispatch({
    type: ACTION.FETCH_POSTS,
    request: {
      url: `${restURL}/posts/${username}?page=${page}&hash_tag=${hashTag}`,
    },
    meta: {
      asPromise: true,
    },
  });
};

export const post = message => (dispatch, getState) => {
  return dispatch({
    type: ACTION.POST_MESSAGE,
    request: {
      url: `${restURL}/posts`,
      data: message,
      method: 'post',
    },
    meta: {
      asPromise: true,
    },
  });
};

export const deletePost = id => (dispatch, getState) => {
  const posts = getState().posts.posts.filter(post => post.id !== id);
  dispatch({
    type: ACTION.DELETE_POST,
    request: {
      url: `${restURL}/posts/${id}`,
      method: 'delete',
    },
    meta: {
      posts,
    },
  });
};
