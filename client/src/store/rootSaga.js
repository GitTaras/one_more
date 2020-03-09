import axios from 'axios';
import { watchRequests, createRequestInstance } from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-axios';
// import('../utils/networkInterceptors');

axios.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem('token');

    if (token != null) {
      config.headers.Authorization = `Baerer: ${token}`;
    }
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

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
  yield watchRequests();
}

export default rootSaga;
