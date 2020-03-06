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
        // currentUser: null,
        errorMessage: action.error.message,
      };

    case success(ACTION.AUTH):
      return {
        ...state,
        currentUser: action.data.currentUser,
        isLoading: false,
        isError: false,
        errorMessage: '',
      };

    default:
      return state;
  }
};
