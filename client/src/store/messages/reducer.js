import ACTION from '../constants';
import { success, error } from 'redux-saga-requests';

const initialState = {
  error: false,
  isLoading: false,
  etext: '',
  hasMore: false,
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION.CLEAN_CHAT:
      return { ...initialState };

    case ACTION.FETCH_CHAT_MESSAGES:
      return { ...state, isLoading: true };

    case error(ACTION.FETCH_CHAT_MESSAGES):
      return { ...state, isLoading: false, error: true, etext: action.error.message };

    case success(ACTION.FETCH_CHAT_MESSAGES):
      return {
        ...state,
        messages: [...action.data.messages, ...state.messages],
        isLoading: false,
        error: false,
        etext: '',
        hasMore: action.data.hasMore,
      };

    case success(ACTION.POST_CHAT_MESSAGE): {
      return {
        ...state,
        isLoading: false,
        error: false,
        etext: '',
        messages: action.meta.messages,
      };
    }
    case success(ACTION.DELETE_CHAT_MESSAGE): {
      return {
        ...state,
        isLoading: false,
        error: false,
        etext: '',
        messages: action.meta.messages,
      };
    }

    default:
      return state;
  }
}
