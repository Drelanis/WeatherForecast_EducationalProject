import { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { LOGOUT } from '@apolloGraphQL/mutation/logout';
import { AuthContext } from '@context';

const useLogout = () => {
  const [logout] = useMutation(LOGOUT);
  const { setAuth } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await toast.promise(
        async () => {
          localStorage.removeItem('userID');
          await logout();
        },
        { pending: 'Logout ...' }
      );
      setAuth(false);
      toast.success('User is logged out');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return { handleLogout };
};

export default useLogout;
