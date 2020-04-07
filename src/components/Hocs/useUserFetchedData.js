import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../store/auth/auth-selectors';
import { auth } from '../../store/auth/auth-actions';

function useUserFetchedData() {
  const dispatch = useDispatch();
  let history = useHistory();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      const token = localStorage.getItem('token');

      if (token) {
        dispatch(auth());
      } else {
        history.replace('/sign-in');
      }
    }
  }, []);

  return currentUser;
}

export default useUserFetchedData;
