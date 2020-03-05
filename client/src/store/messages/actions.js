import ACTION from '../constants';
import { restURL } from '../../utils/baseURL';

export const cleanChat = () => ({
  type: ACTION.CLEAN_CHAT,
});

export const getChatMessages = (page = 1) => dispatch => {
  return dispatch({
    type: ACTION.FETCH_CHAT_MESSAGES,
    request: {
      url: `${restURL}/chat?page=${page}`,
    },
    meta: {
      asPromise: true,
    },
  });
};

export const postChatMessage = message => (dispatch, getState) => {
  dispatch({
    type: ACTION.POST_CHAT_MESSAGE,
    request: {
      url: `${restURL}/chat`,
      data: message,
      method: 'post',
    },
  });
};

export const deleteChatMessage = id => (dispatch, getState) => {
  const messages = getState().messages.messages.filter(message => message._id !== id);
  dispatch({
    type: ACTION.DELETE_CHAT_MESSAGE,
    request: {
      url: `${restURL}/chat/${id}`,
      method: 'delete',
    },
    meta: {
      messages,
    },
  });
};
