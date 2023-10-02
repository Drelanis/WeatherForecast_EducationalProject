import { LOGOUT } from '@apolloGraphQL/mutation/logout';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

const useLogout = () => {
  const [logout] = useMutation(LOGOUT);

  const handleLogout = async () => {
    try {
      await toast.promise(
        async () => {
          localStorage.removeItem('accessToken');
          await logout();
        },
        { pending: 'Logout ...' }
      );
      toast.success('User is logged out');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return { handleLogout };
};

export default useLogout;
