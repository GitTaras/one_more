import ACTION from '../constants';
import { restURL } from '../../utils/baseURL';

export const cleanChat = () => ({
  type: ACTION.CLEAN_CHAT,
});

export const getChatMessages = (page = 1) => dispatch => {
  return dispatch({
    type: ACTION.FETCH_CHAT_MESSAGES,
    request: {
      url: `${restURL}/posts?page=${page}`,
    },
    meta: {
      asPromise: true,
    },
  });
};

export const postChatMessage = message => (dispatch, getState) => {
  return dispatch({
    type: ACTION.POST_CHAT_MESSAGE,
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

export const deleteChatMessage = id => (dispatch, getState) => {
  const messages = getState().messages.messages.filter(message => message.id !== id);
  dispatch({
    type: ACTION.DELETE_CHAT_MESSAGE,
    request: {
      url: `${restURL}/posts/${id}`,
      method: 'delete',
    },
    meta: {
      messages,
    },
  });
};