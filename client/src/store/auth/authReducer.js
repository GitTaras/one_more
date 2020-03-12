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
    case ACTION.LOGOUT:
      return { ...initialState };

    case ACTION.AUTH:
      return { ...state, isLoading: true, isError: false, errorMessage: '' };

    case error(ACTION.AUTH):
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.error.response.data || action.error.response.message,
      };

    case success(ACTION.AUTH):
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
