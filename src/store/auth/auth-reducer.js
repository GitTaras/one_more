import { success, error } from 'redux-saga-requests';
import { AUTH, AUTH_CLEAR_ERROR, EDIT_ACCOUNT, UPDATE_PASSWORD, AUTH_CLEAR } from './auth-actions';

const initialState = {
  isError: false,
  isLoading: false,
  errorObj: null,
  currentUser: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_CLEAR_ERROR:
      return { ...state, isError: false, errorMessage: '' };

    case AUTH:
    case EDIT_ACCOUNT:
    case UPDATE_PASSWORD:
      return { ...state, isLoading: true, isError: false, errorMessage: '' };

    case error(AUTH):
    case error(EDIT_ACCOUNT):
    case error(UPDATE_PASSWORD): {
      // console.dir(action.error);
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorObj: action.error.response
          ? action.error.response.data || action.error.response.message
          : action.error.message,
      };
    }
    case success(AUTH):
    case success(EDIT_ACCOUNT):
    case success(UPDATE_PASSWORD):
      return {
        ...state,
        currentUser: action.data.user,
        isLoading: false,
        isError: false,
        errorMessage: '',
      };

    case AUTH_CLEAR:
      return { ...initialState };

    default:
      return state;
  }
};
