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

//log
export const signin = userData => dispatch => {
  return dispatch({
    type: ACTION.AUTH,
    request: {
      url: `${restURL}/auth/signin`,
      data: userData,
      method: 'post',
    },
    meta: {
      // asPromise: true,
    },
  });
};
//reg
export const signup = userData => dispatch => {
  dispatch({
    type: ACTION.AUTH,
    request: {
      url: `${restURL}/auth/signup`,
      data: userData,
      method: 'post',
    },
  });
};

export const clearAuth = () => dispatch => {
  localStorage.removeItem('token');
  return dispatch({ type: ACTION.AUTH_CLEAR });
};
