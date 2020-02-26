import { put } from 'redux-saga/effects';
import {
  getChatMessagesThunk,
  deleteChatMessageThunk,
  postChatMessageThunk,
} from '../thunks/index';

export function* getMessages({ offset }) {
  try {
    yield put(getChatMessagesThunk(offset));
  } catch {
    console.log('error get saga');
  }
}

export function* deleteMessage({ id }) {
  try {
    yield put(deleteChatMessageThunk(id));
  } catch {
    console.log('error delete saga');
  }
}

export function* addMessage({ message }) {
  try {
    yield put(postChatMessageThunk(message));
  } catch {
    console.log('error add saga');
  }
}
