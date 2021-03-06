import { success, error } from 'redux-saga-requests';
import {
  AUTH,
  AUTH_CLEAR_ERROR,
  UPDATE_ACCOUNT,
  UPDATE_PASSWORD,
  AUTH_CLEAR,
  SIGN_IN,
  SIGN_UP,
  UPDATE_AVATAR,
} from './auth-actions';

const initialState = {
  isError: false,
  isAuthorizing: false,
  isLoading: false,
  isUpdatingPassword: false,
  isUpdatingAvatar: false,
  errorObj: null,
  currentUser: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_CLEAR_ERROR:
      return { ...state, isError: false, errorObj: null };

    case AUTH:
      return { ...state, isAuthorizing: true, isLoading: true, isError: false, errorObj: null };

    case SIGN_IN:
    case SIGN_UP:
    case UPDATE_ACCOUNT:
      return { ...state, isLoading: true, isError: false, errorObj: null };
    case UPDATE_PASSWORD:
      return { ...state, isUpdatingPassword: true, isError: false, errorObj: null };
    case UPDATE_AVATAR:
      return { ...state, isUpdatingAvatar: true, isError: false, errorObj: null };

    case error(AUTH):
    case error(SIGN_IN):
    case error(SIGN_UP):
    case error(UPDATE_ACCOUNT):
      return {
        ...state,
        isAuthorizing: false,
        isLoading: false,
        isError: true,
        errorObj: {
          message: action.error.response
            ? action.error.response.data.message
            : action.error.message,
          errors: action.error?.response?.data?.errors,
        },
      };

    case error(UPDATE_PASSWORD):
      return {
        ...state,
        isUpdatingPassword: false,
        isError: true,
        errorObj: {
          message: action.error.response
            ? action.error.response.data.message
            : action.error.message,
          errors: action.error?.response?.data?.errors,
        },
      };

    case error(UPDATE_AVATAR): {
      //console.dir(action.error);
      return {
        ...state,
        isUpdatingAvatar: false,
        isError: true,
        errorObj: {
          message: action.error.response
            ? action.error.response.data.message
            : action.error.message,
          errors: action.error?.response?.data?.errors,
        },
      };
    }

    case success(AUTH):
    case success(SIGN_IN):
    case success(SIGN_UP):
    case success(UPDATE_ACCOUNT):
      return {
        ...state,
        currentUser: action.data.user,
        isAuthorizing: false,
        isLoading: false,
        isError: false,
        errorObj: null,
      };

    case success(UPDATE_PASSWORD):
      return {
        ...state,
        currentUser: action.data.user,
        isUpdatingPassword: false,
        isError: false,
        errorObj: null,
      };

    case success(UPDATE_AVATAR):
      return {
        ...state,
        currentUser: action.data.user,
        isUpdatingAvatar: false,
        isError: false,
        errorObj: null,
      };

    case AUTH_CLEAR:
      return { ...initialState };

    default:
      return state;
  }
};
