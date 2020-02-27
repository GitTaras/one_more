import ACTION from '../constants';
import { restURL } from '../../api/baseURL';

export const chatMessagesReq = () => ({
  type: ACTION.FCHAT_MESSAGES_LOADING,
});

export const cleanChat = () => ({
  type: ACTION.CLEAN_CHAT,
});

export const getChatMessagesSuccess = (messages, hasMore) => ({
  type: ACTION.FCHAT_MESSAGES_SUCCESS,
  messages,
  hasMore,
});

export const getChatMessages = (offset = 0) => dispatch => {
  return dispatch({
    type: ACTION.FETCH_CHAT_MESSAGES,
    request: {
      url: `${restURL}/chat?offset=${offset}`,
    },
    meta: {
      asPromise: true,
    },
  });
};

// import { POST_CHAT_MESSAGE_SUCCESS } from '../store/constants';
export const postChatMessage = message => (dispatch, getState) => {
  const messages = getState().messages.messages.concat(message);
  dispatch({
    type: ACTION.POST_CHAT_MESSAGE,
    request: {
      url: `${restURL}/chat`,
      data: message,
      method: 'post',
    },
    meta: {
      asPromise: true,
      messages,
    },
  });
};

export const deleteChatMessage = id => (dispatch, getState) => {
  const messages = getState().messages.messages.filter(
    message => message.id !== id
  );
  dispatch({
    type: ACTION.DELETE_CHAT_MESSAGE,
    request: {
      url: `${restURL}/chat/${id}`,
      method: 'delete',
    },
    meta: {
      asPromise: true,
      messages,
    },
  });
}

export const chatMessagesError = etext => ({
  type: ACTION.FCHAT_MESSAGES_ERROR,
  etext,
});
