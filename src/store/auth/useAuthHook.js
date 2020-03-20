import { useSelector } from 'react-redux';

const useAuthHook = () => {
  const isLoading = useSelector(state => state.auth.isLoading);
  const isError = useSelector(state => state.auth.isError);
  const errorMessage = useSelector(state => state.auth.errorMessage);
  const currentUser = useSelector(state => state.auth.currentUser);

  return { isLoading, isError, errorMessage, currentUser };
};

export default useAuthHook;
