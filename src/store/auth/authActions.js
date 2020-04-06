import ACTION from '../constants';
import { restURL } from '../../utils/baseURL';

//get-user "auth"
export const auth = () => dispatch => {
  return dispatch({
    type: ACTION.AUTH,
    request: {
      url: `${restURL}/auth/get-user`,
    },
    meta: {
      // asPromise: true,
    },
  });
};

export const signIn = userData => dispatch => {
  return dispatch({
    type: ACTION.AUTH,
    request: {
      url: `${restURL}/auth/sign-in`,
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
    type: ACTION.AUTH,
    request: {
      url: `${restURL}/auth/sign-up`,
      data: userData,
      method: 'post',
    },
  });
};

// export const clearAuth = () => dispatch => {
//   return dispatch({ type: ACTION.AUTH_CLEAR });
// };

export const editAccount = userData => dispatch => {
  dispatch({
    type: ACTION.EDIT_ACCOUNT,
    request: {
      url: `${restURL}/users/`,
      data: userData,
      method: 'put',
    },
  });
};

export const updatePassword = data => dispatch => {
  dispatch({
    type: ACTION.UPDATE_PASSWORD,
    request: {
      url: `${restURL}/users/update-password`,
      data: data,
      method: 'put',
    },
  });
};
