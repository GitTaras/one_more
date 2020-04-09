import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { requestsPromiseMiddleware } from 'redux-saga-requests';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './rootSaga';
import posts from './posts/posts-reducer';
import auth from './auth/auth-reducer';
import unAuthorizedMiddleware from './auth/auth-middleware';

const reducers = combineReducers({
  posts,
  auth,
});

const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk, sagaMiddleware, unAuthorizedMiddleware];
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(requestsPromiseMiddleware(), ...middleware))
);

sagaMiddleware.run(rootSaga);

export default store;
