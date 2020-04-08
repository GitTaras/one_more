import { success, error } from 'redux-saga-requests';
//TODO DELETE AUTH_CLEAR ON SIGN OUT LOCATION.RELOAD REFRESH
import {
  CREATE_POST,
  CLEAR_POSTS,
  DELETE_POST,
  FETCH_POSTS,
  CLEAR_POSTS_ERROR,
} from './posts-actions';
import { AUTH_CLEAR } from '../auth/auth-actions';

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
    case AUTH_CLEAR:
    case CLEAR_POSTS:
      return { ...initialState };

    case CLEAR_POSTS_ERROR:
      return { ...state, isError: false, errorMessage: '' };

    case FETCH_POSTS:
      return { ...state, isLoading: true, isError: false, errorMessage: '' };
    case DELETE_POST:
      return { ...state, posts: action.meta.postsWithoutDeleted, isError: false, errorMessage: '' };

    case error(FETCH_POSTS):
    case error(CREATE_POST):
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.error.response
          ? action.error.response.data || action.error.response.message
          : action.error.message,
      };

    case error(DELETE_POST):
      return {
        ...state,
        posts: action.meta.posts,
        isLoading: false,
        isError: true,
        errorMessage: action.error.response
          ? action.error.response.data || action.error.response.message
          : action.error.message,
      };

    case success(FETCH_POSTS):
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

    case CREATE_POST:
      return { ...state, isLoading: true, isError: false, errorMessage: '' };

    case success(CREATE_POST): {
      const posts = [action.data, ...state.posts]; /*state.posts.concat(action.data);*/
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: '',
        posts: posts,
      };
    }

    case success(DELETE_POST): {
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: '',
        // posts: action.meta.posts,
      };
    }

    default:
      return state;
  }
};
