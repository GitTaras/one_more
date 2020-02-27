import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { requestsPromiseMiddleware } from 'redux-saga-requests';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './rootSaga';
import messages from './messages/reducer';

function configureStore() {
  const reducers = combineReducers({
    messages,
    //
  });

  const sagaMiddleware = createSagaMiddleware();
  const middleware = [thunk, sagaMiddleware];
  const store = createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(requestsPromiseMiddleware(), ...middleware)
    )
  );

  sagaMiddleware.run(rootSaga);
  return store;
}

export default configureStore();