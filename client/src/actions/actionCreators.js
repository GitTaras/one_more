import ACTION from './actionTypes';

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

export const postChatMessageSuccess = message => ({
  type: ACTION.POST_CHAT_MESSAGE_SUCCESS,
  message,
});

export const deleteChatMessageSuccess = id => ({
  type: ACTION.DELETE_CHAT_MESSAGE_SUCCESS,
  id,
});

export const chatMessagesError = etext => ({
  type: ACTION.FCHAT_MESSAGES_ERROR,
  etext,
});
