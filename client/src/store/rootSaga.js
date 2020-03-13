import axios from 'axios';
import { watchRequests, createRequestInstance, success, error } from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-axios';
import { baseURL } from '../utils/baseURL';
import ACTION from './constants';
import { all, takeLatest } from '@redux-saga/core/effects';

axios.defaults.baseURL = baseURL;
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Baerer: ${token}`;
}

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      window.location.replace('/signin');
    }
    if (error.response.status === 404) {
      window.location.replace('/not_found');
    }
    return Promise.reject(error);
  }
);

function* rootSaga() {
  yield createRequestInstance({ driver: createDriver(axios) });
  yield all([
    watchRequests(),
    takeLatest(success(ACTION.AUTH), action => {
      axios.defaults.headers.common['Authorization'] = `Baerer: ${action.data.token}`;
      localStorage.setItem('token', action.data.token);
    }),
    takeLatest(ACTION.AUTH_CLEAR, action => {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }),
    takeLatest(error(ACTION.AUTH), action => localStorage.removeItem('token')),
  ]);
}

export default rootSaga;
