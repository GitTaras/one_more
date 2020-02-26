import { takeLatest } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import { getMessages, deleteMessage, addMessage } from './messagesSaga';

function* rootSaga() {
  yield takeLatest(ACTION.FCHAT_MESSAGES, getMessages);
  yield takeLatest(ACTION.DELETE_CHAT_MESSAGE, deleteMessage);
  yield takeLatest(ACTION.POST_CHAT_MESSAGE, addMessage);
}

export default rootSaga;
