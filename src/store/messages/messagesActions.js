import ACTION from '../constants';
import { restURL } from '../../utils/baseURL';

export const cleanPosts = () => ({
  type: ACTION.CLEAN_POSTS,
});

export const getPosts = (page = 1) => dispatch => {
  return dispatch({
    type: ACTION.FETCH_POSTS,
    request: {
      url: `${restURL}/posts?page=${page}`,
    },
    meta: {
      asPromise: true,
    },
  });
};

export const postMessage = message => (dispatch, getState) => {
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
  const messages = getState().messages.messages.filter(message => message.id !== id);
  dispatch({
    type: ACTION.DELETE_POST,
    request: {
      url: `${restURL}/posts/${id}`,
      method: 'delete',
    },
    meta: {
      messages,
    },
  });
};
