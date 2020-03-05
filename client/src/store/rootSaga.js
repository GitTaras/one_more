import axios from 'axios';
import { watchRequests, createRequestInstance } from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-axios';
// import('../utils/networkInterceptors');

axios.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem('token');

    if (token != null) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      window.location.replace('/signin');
    }
    if (error.response.status === 403) {
      window.location.replace('/not_found');
    }
    return Promise.reject(error);
  }
);

function* rootSaga() {
  yield createRequestInstance({ driver: createDriver(axios) });
  yield watchRequests();
}

export default rootSaga;
