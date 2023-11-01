import { useMutation } from '@apollo/client';
import { LOGOUT } from 'apollo/mutation/logout';
import { AuthContext, LoadingContext } from 'context/index';
import { useContext } from 'react';

const useLogout = () => {
  const [logout] = useMutation(LOGOUT);
  const { setAuth } = useContext(AuthContext);
  const { setLoading } = useContext(LoadingContext);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { data } = await logout();
      if (data?.logout) {
        setAuth({ isAuth: false, userId: '' });
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogout };
};

export default useLogout;
