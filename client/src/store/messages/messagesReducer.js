import ACTION from '../constants';
import { success, error } from 'redux-saga-requests';

const initialState = {
  isError: false,
  isLoading: false,
  errorMessage: '',
  hasMore: false,
  page: 1,
  nextPage: 1,
  limit: 15,
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION.AUTH_CLEAR:
      return { ...initialState };

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
        messages: [...action.data.docs, ...state.messages],
        isLoading: false,
        isError: false,
        errorMessage: '',
        hasMore: action.data.page < action.data.pages,
        page: action.data.page,
        nextPage: action.data.nextPage,
        limit: action.data.limit,
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
      const messages = state.messages.concat(action.data);
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: '',
        messages: messages,
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
