import { getChatMessagesReq } from '../api/index';
import {
  getChatMessagesError,
  getChatMessagesSuccess,
  getChatMessages,
} from '../actions/actionCreators';

export function getChatMessagesThunk() {
  return function(dispatch) {
    dispatch(getChatMessages());
    getChatMessagesReq()
      .then(data => {
        dispatch(getChatMessagesSuccess(data));
      })
      .catch(error => {
        const etext = error.response
          ? error.response.data.message
          : error.message;
        dispatch(getChatMessagesError(etext));
      });
  };
}
