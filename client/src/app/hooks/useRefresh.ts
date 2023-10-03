import { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { AuthContext } from '@context';
import { REFRESH } from '@apolloGraphQL/mutation/refresh';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const useRefresh = () => {
  const { setAuth } = useContext(AuthContext);
  const [refresh] = useMutation(REFRESH);
  const router = useRouter();

  const handleRefresh = async () => {
    try {
      await toast.promise(
        async () => {
          const { data } = await refresh();
          localStorage.setItem('accessToken', data.refreshTokens.accessToken);
          setAuth(true);
        },
        { pending: 'Authorization check ...' }
      );
    } catch (error: any) {
      setAuth(false);
      router.push('/login');
      toast.info(error.message);
    }
  };

  return { handleRefresh };
};

export default useRefresh;
