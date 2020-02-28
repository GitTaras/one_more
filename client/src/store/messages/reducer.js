import ACTION from '../constants';
import { success, error } from 'redux-saga-requests';

const initialState = {
  isError: false,
  isLoading: false,
  errorMessage: '',
  hasMore: false,
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION.CLEAN_CHAT:
      return { ...initialState };

    case ACTION.FETCH_CHAT_MESSAGES:
      return { ...state, isLoading: true, isError: false, errorMessage: '' };

    case error(ACTION.FETCH_CHAT_MESSAGES):
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.error.message,
      };

    case success(ACTION.FETCH_CHAT_MESSAGES):
      return {
        ...state,
        messages: [...action.data.messages, ...state.messages],
        isLoading: false,
        isError: false,
        errorMessage: '',
        hasMore: action.data.hasMore,
      };

    case ACTION.POST_CHAT_MESSAGE:
      return { ...state, isLoading: true, isError: false, errorMessage: '' };

    case error(ACTION.POST_CHAT_MESSAGE):
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.error.message,
      };

    case success(ACTION.POST_CHAT_MESSAGE): {
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: '',
        messages: action.meta.messages,
      };
    }

    case ACTION.DELETE_CHAT_MESSAGE:
      return { ...state, isLoading: true, isError: false, errorMessage: '' };

    case error(ACTION.DELETE_CHAT_MESSAGE):
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.error.message,
      };

    case success(ACTION.DELETE_CHAT_MESSAGE): {
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: '',
        messages: action.meta.messages,
      };
    }

    default:
      return state;
  }
};
