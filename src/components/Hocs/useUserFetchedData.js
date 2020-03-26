import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useAuthHook from '../../store/auth/useAuthHook';
import { auth } from '../../store/auth/authActions';

function useUserFetchedData() {
  const dispatch = useDispatch();
  let history = useHistory();
  const { currentUser } = useAuthHook();

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
