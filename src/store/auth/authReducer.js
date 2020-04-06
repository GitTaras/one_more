import ACTION from '../constants';
import { success, error } from 'redux-saga-requests';

const initialState = {
  isError: false,
  isLoading: false,
  errorMessage: '',
  currentUser: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION.AUTH_CLEAR_ERROR:
      return { ...state, isError: false, errorMessage: '' };

    case ACTION.AUTH:
    case ACTION.EDIT_ACCOUNT:
    case ACTION.UPDATE_PASSWORD:
      return { ...state, isLoading: true, isError: false, errorMessage: '' };

    case error(ACTION.AUTH):
    case error(ACTION.EDIT_ACCOUNT):
    case error(ACTION.UPDATE_PASSWORD):
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.error.response
          ? action.error.response.data || action.error.response.message
          : action.error.message,
      };

    case success(ACTION.AUTH):
    case success(ACTION.EDIT_ACCOUNT):
    case success(ACTION.UPDATE_PASSWORD):
      return {
        ...state,
        currentUser: action.data.user,
        isLoading: false,
        isError: false,
        errorMessage: '',
      };

    case ACTION.AUTH_CLEAR:
      return { ...initialState };

    default:
      return state;
  }
};
