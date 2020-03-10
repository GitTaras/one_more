import axios from 'axios';
import { watchRequests, createRequestInstance, success } from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-axios';
import { baseURL } from '../utils/baseURL';
import ACTION from './constants';
import { all, takeLatest } from '@redux-saga/core/effects';
import { signinSuccess } from './auth/authActions';

//todo axios.defaults

axios.defaults.baseURL = baseURL;
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Baerer: ${token}`;
}

// axios.interceptors.request.use(
//   function(config) {
//     const token = localStorage.getItem('token');
//
//     if (token != null) {
//       config.headers.Authorization = `Baerer: ${token}`;
//     }
//     return config;
//   },
//   function(err) {
//     return Promise.reject(err);
//   }
// );

axios.interceptors.response.use(
  response => {
    if (response.data.token) localStorage.setItem('token', response.data.token);
    return response;
  },
  error => {
    console.log(error);
    debugger;
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
    takeLatest(
      success(ACTION.AUTH),
      (action) => { console.log("here",action); axios.defaults.headers.common['Authorization'] = `Baerer: ${action.data.token}`;  /*signinSuccess(action)*/}
    ),
  ]);

  //todo check for succes signin action and put token to local storage
}

export default rootSaga;
