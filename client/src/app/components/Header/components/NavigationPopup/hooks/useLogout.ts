import { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { LOGOUT } from '@apolloGraphQL/mutation/logout';
import { AuthContext, UserIdContext } from '@context';
import { useRouter } from 'next/navigation';
import useHandlePageRedirect from '@hooks/useHandlePageRedirect';

const useLogout = () => {
  const [logout] = useMutation(LOGOUT);
  const { setAuth } = useContext(AuthContext);
  const { handlePageRedirect } = useHandlePageRedirect();
  const { setUserId } = useContext(UserIdContext);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await toast.promise(
        async () => {
          setUserId('');
          await logout();
        },
        { pending: 'Logout ...' }
      );
      handlePageRedirect('/login');
      router.refresh();
      setAuth(false);
      toast.success('User is logged out');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return { handleLogout };
};

export default useLogout;
