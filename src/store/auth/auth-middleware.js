import { AUTH_CLEAR } from './auth-actions';

function unAuthorizedMiddleware() {
  return function(_ref) {
    const dispatch = _ref.dispatch,
      getState = _ref.getState;
    return function(next) {
      return function(action) {
        if (action?.error?.response && action.error.response.status === 401) {
          return dispatch({ type: AUTH_CLEAR });
        }
        if (action?.error?.response && action.error.response.status === 404) {
          window.location.replace('/not_found');
        }
        return next(action);
      };
    };
  };
}

export default unAuthorizedMiddleware();
