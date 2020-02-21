import { createStore, applyMiddleware /*compose*/ } from 'redux';
import thunk from 'redux-thunk';
import combinedReducers from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

function configureStore() {
  const middleware = [thunk];
  return createStore(
    combinedReducers,
    composeWithDevTools(applyMiddleware(...middleware))
  );
}

export default configureStore();
