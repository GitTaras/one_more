import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from './store/index';
import Navigator from './Navigator';
import { auth } from './store/auth/authActions';

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (localStorage.getItem('token') {
  //     dispatch(auth);
  //   }
  // }, []);
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
