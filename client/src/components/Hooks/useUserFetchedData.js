import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useAuthReducerData from './useAuthReducerData';
import { auth } from '../../store/auth/authActions';

function useUserFetchedData() {
  const dispatch = useDispatch();
  let history = useHistory();
  const { currentUser } = useAuthReducerData();

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

  return currentUser;
}

export default useUserFetchedData;
