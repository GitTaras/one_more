import ACTION from '../constants';
import { restURL } from '../../utils/baseURL';
import { success } from 'redux-saga-requests';

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

// export const signinSuccess = action => dispatch => {
//   return dispatch({
//     type: success(ACTION.AUTH),
//     action,
//   });
// }

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

// export const logout = history => dispatch => {
//   dispatch({
//     type: ACTION.LOGOUT,
//   });
//   //todo move to component
//   localStorage.removeItem('token');
//   history.push('/');
// };

export const clearAuth = () => dispatch => {
  localStorage.removeItem('token');
  return dispatch({ type: ACTION.AUTH_CLEAR });
};
