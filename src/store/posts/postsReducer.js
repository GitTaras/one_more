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
  posts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION.AUTH_CLEAR:
    case ACTION.CLEAN_POSTS:
      return { ...initialState };

    case ACTION.FETCH_POSTS:
    case ACTION.DELETE_POST:
      return { ...state, isLoading: true, isError: false, errorMessage: '' };

    case error(ACTION.FETCH_POSTS):
    case error(ACTION.POST_MESSAGE):
    case error(ACTION.DELETE_POST):
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.error.response
          ? action.error.response.data || action.error.response.message
          : action.error.message,
      };

    case success(ACTION.FETCH_POSTS):
      return {
        ...state,
        posts: [...state.posts, ...action.data.docs],
        isLoading: false,
        isError: false,
        errorMessage: '',
        hasMore: action.data.page < action.data.pages,
        page: action.data.page,
        nextPage: action.data.nextPage,
        limit: action.data.limit,
      };

    case ACTION.POST_MESSAGE:
      return { ...state, isLoading: true, isError: false, errorMessage: '' };

    case success(ACTION.POST_MESSAGE): {
      const posts = [action.data, ...state.posts]; /*state.posts.concat(action.data);*/
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: '',
        posts: posts,
      };
    }

    case success(ACTION.DELETE_POST): {
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: '',
        posts: action.meta.posts,
      };
    }

    default:
      return state;
  }
};
