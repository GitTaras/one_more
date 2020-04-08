import axios from 'axios';
import { watchRequests, createRequestInstance, success /*, error */ } from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-axios';
import {
  AUTH,
  AUTH_CLEAR,
  EDIT_ACCOUNT,
  SIGN_IN,
  SIGN_UP,
  UPDATE_PASSWORD,
} from './auth/auth-actions';
import { all, takeLatest } from '@redux-saga/core/effects';

axios.defaults.baseURL = process.env.restURL || 'http://localhost:8000';
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Baerer: ${token}`;
}

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // history.push('/sign-in');
      window.location.replace('/sign-in');
    }
    if (error.response && error.response.status === 404) {
      // history.push('/not_found');
      window.location.replace('/not_found');
    }
    return Promise.reject(error);
  }
);

function* rootSaga() {
  yield createRequestInstance({ driver: createDriver(axios) });
  yield all([
    watchRequests(),
    takeLatest(
      [
        success(UPDATE_PASSWORD),
        success(EDIT_ACCOUNT),
        success(SIGN_UP),
        success(SIGN_IN),
        success(AUTH),
      ],
      action => {
        axios.defaults.headers.common['Authorization'] = `Baerer: ${action.data.token}`;
        localStorage.setItem('token', action.data.token);
      }
    ),
    takeLatest(AUTH_CLEAR, action => {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }),
    //takeLatest(error(AUTH), action => localStorage.removeItem('token')),
  ]);
}

export default rootSaga;
