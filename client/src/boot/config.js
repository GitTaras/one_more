import { createStore, applyMiddleware /*compose*/ } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';
import { requestsPromiseMiddleware } from 'redux-saga-requests';
import combinedReducers from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [thunk, sagaMiddleware];
  const store = createStore(
    combinedReducers,
    composeWithDevTools(
      applyMiddleware(requestsPromiseMiddleware(), ...middleware)
    )
  );
  sagaMiddleware.run(rootSaga, store.dispatch);
  return store;
}

export default configureStore();
