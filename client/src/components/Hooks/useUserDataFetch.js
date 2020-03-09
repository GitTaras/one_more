import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { auth } from '../../store/auth/actions';

function useUserDataFetch() {
  const dispatch = useDispatch();
  let history = useHistory();
  const isLoading = useSelector(state => state.auth.isLoading);
  const isError = useSelector(state => state.auth.isError);
  const errorMessage = useSelector(state => state.auth.errorMessage);
  const currentUser = useSelector(state => state.auth.currentUser);

  useEffect(() => {
    if (!currentUser) {
      const token = localStorage.getItem('token');

      if (token) {
        dispatch(auth());
      } else {
        history.replace('/signin');
      }
    }
  }, []);

  return {
    isLoading,
    isError,
    errorMessage,
    currentUser,
  };
}

export default useUserDataFetch;
