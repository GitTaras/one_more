import {
  getChatMessagesReq,
  postChatMessageReq,
  deleteChatMessageReq,
} from '../api/index';
import {
  chatMessagesError,
  getChatMessagesSuccess,
  chatMessagesReq,
  deleteChatMessageSuccess,
  postChatMessageSuccess,
} from '../actions/actionCreators';

export function getChatMessagesThunk(offset) {
  return function(dispatch) {
    dispatch(chatMessagesReq());
    getChatMessagesReq(offset)
      .then(data => {
        dispatch(getChatMessagesSuccess(data.messages, data.hasMore));
      })
      .catch(error => {
        const etext = error.response
          ? error.response.data.message
          : error.message;
        dispatch(chatMessagesError(etext));
      });
  };
}

export function deleteChatMessageThunk(id) {
  return function(dispatch) {
    //dispatch(chatMessagesReq());
    deleteChatMessageReq(id)
      .then(data => {
        dispatch(deleteChatMessageSuccess(id));
      })
      .catch(error => {
        const etext = error.response
          ? error.response.data.message
          : error.message;
        dispatch(chatMessagesError(etext));
      });
  };
}

export function postChatMessageThunk(message) {
  return function(dispatch) {
    //dispatch(chatMessagesReq());
    postChatMessageReq(message)
      .then(data => {
        dispatch(postChatMessageSuccess(message));
      })
      .catch(error => {
        const etext = error.response
          ? error.response.data.message
          : error.message;
        dispatch(chatMessagesError(etext));
      });
  };
}
