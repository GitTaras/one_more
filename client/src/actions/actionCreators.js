import ACTION from './actionTypes';

export const getChatMessages = () => ({
  type: ACTION.FCHAT_MESSAGES_LOADING,
});

export const getChatMessagesSuccess = messages => ({
  type: ACTION.FCHAT_MESSAGES_SUCCESS,
  messages,
});

export const getChatMessagesError = etext => ({
  type: ACTION.FCHAT_MESSAGES_ERROR,
  etext,
});

export const addChatMessages = message => ({
  type: ACTION.ADD_MESSAGE,
  message,
});
