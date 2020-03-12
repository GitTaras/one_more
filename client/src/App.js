import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navigator from './Navigator';
import { auth } from './store/auth/authActions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(auth());
    }
  }, []);

  return <Navigator />;
};

export default App;
