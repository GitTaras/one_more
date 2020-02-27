import axios from 'axios';
import { watchRequests, createRequestInstance, } from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-axios';

function* rootSaga() {
  yield createRequestInstance({ driver: createDriver(axios) });
  yield watchRequests();
}

export default rootSaga;
