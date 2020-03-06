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
      asPromise: true,
    },
  });
};

//log
export const signin = (userData, history) => dispatch => {
  return dispatch({
    type: ACTION.AUTH,
    request: {
      url: `${restURL}/auth/signin`,
      data: userData,
      method: 'post',
    },
    meta: {
      asPromise: true,
    },
  });
};
//reg
export const signup = (userData, histroy) => (dispatch, getState) => {
  dispatch({
    type: ACTION.C,
    request: {
      url: `${restURL}/auth/singup`,
      data: userData,
      method: 'post',
    },
  });
};

export const logout = history => dispatch => {
  dispatch({
    type: ACTION.LOGOUT,
  });
  localStorage.removeItem('token');
  history.push('/');
};
