import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navigation from './Navigation';
import { auth } from './store/auth/authActions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(auth());
    }
  }, []);

  return <Navigation />;
};

export default App;
