export const AUTH_CLEAR_ERROR = 'AUTH_CLEAR_ERROR';
export const AUTH = 'AUTH';
export const auth = () => dispatch => {
  return dispatch({
    type: AUTH,
    request: {
      url: '/auth/get-user',
    },
    meta: {
      // asPromise: true,
    },
  });
};

export const signIn = userData => dispatch => {
  return dispatch({
    type: AUTH,
    request: {
      url: '/auth/sign-in',
      data: userData,
      method: 'post',
    },
    meta: {
      // asPromise: true,
    },
  });
};

export const signUp = userData => dispatch => {
  dispatch({
    type: AUTH,
    request: {
      url: '/auth/sign-up',
      data: userData,
      method: 'post',
    },
  });
};

export const AUTH_CLEAR = 'AUTH_CLEAR';
export const clearAuth = () => ({ type: AUTH_CLEAR });

export const EDIT_ACCOUNT = 'EDIT_ACCOUNT';
export const editAccount = userData => dispatch => {
  return dispatch({
    type: EDIT_ACCOUNT,
    request: {
      url: '/users/',
      data: userData,
      method: 'put',
    },
    meta: {
      asPromise: true,
    },
  });
};

export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const updatePassword = data => dispatch => {
  dispatch({
    type: UPDATE_PASSWORD,
    request: {
      url: '/users/update-password',
      data: data,
      method: 'put',
    },
  });
};
