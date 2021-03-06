export const AUTH_CLEAR_ERROR = 'AUTH_CLEAR_ERROR';
export const AUTH = 'AUTH';
export const auth = () => ({
  type: AUTH,
  request: {
    url: '/auth/get-user',
  },
});

export const SIGN_IN = 'SIGN_IN';
export const signIn = userData => ({
  type: SIGN_IN,
  request: {
    url: '/auth/sign-in',
    data: userData,
    method: 'post',
  },
});

export const SIGN_UP = 'SIGN_UP';
export const signUp = userData => ({
  type: SIGN_UP,
  request: {
    url: '/auth/sign-up',
    data: userData,
    method: 'post',
  },
});

export const AUTH_CLEAR = 'AUTH_CLEAR';
export const clearAuth = () => ({ type: AUTH_CLEAR });

export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const updateAccount = userData => ({
  type: UPDATE_ACCOUNT,
  request: {
    url: '/users/',
    data: userData,
    method: 'put',
  },
  meta: {
    asPromise: true,
  },
});

export const UPDATE_AVATAR = 'UPDATE_AVATAR';
export const updateAvatar = file => {
  const formData = new FormData();
  formData.append('avatar', file);

  return {
    type: UPDATE_AVATAR,
    request: {
      url: '/users/update-avatar',
      data: formData,
      method: 'put',
    },
    meta: {
      asPromise: true,
    },
  };
};

export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const updatePassword = data => ({
  type: UPDATE_PASSWORD,
  request: {
    url: '/users/update-password',
    data: data,
    method: 'put',
  },
  meta: {
    asPromise: true,
  },
});
