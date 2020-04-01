import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { requestsPromiseMiddleware } from 'redux-saga-requests';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './rootSaga';
import posts from './posts/postsReducer';
import auth from './auth/authReducer';

const reducers = combineReducers({
  posts,
  auth,
});

const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk, sagaMiddleware];
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(requestsPromiseMiddleware(), ...middleware))
);

sagaMiddleware.run(rootSaga);

export default store;
