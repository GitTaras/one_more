import axios from 'axios';
import { watchRequests, createRequestInstance, success /*, error */ } from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-axios';
import {
  AUTH,
  AUTH_CLEAR,
  UPDATE_ACCOUNT,
  UPDATE_AVATAR,
  SIGN_IN,
  SIGN_UP,
  UPDATE_PASSWORD,
} from './auth/auth-actions';
import { all, takeLatest } from '@redux-saga/core/effects';

axios.defaults.baseURL = process.env.REACT_APP_restURL;
const token = localStorage.getItem('token');

if (token) {
  axios.defaults.headers.common['Authorization'] = `Baerer: ${token}`;
}

function* rootSaga() {
  yield createRequestInstance({ driver: createDriver(axios) });
  yield all([
    watchRequests(),
    takeLatest(
      [
        success(UPDATE_AVATAR),
        success(UPDATE_PASSWORD),
        success(UPDATE_ACCOUNT),
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
  ]);
}

export default rootSaga;
