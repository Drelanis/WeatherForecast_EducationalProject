import { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { AuthContext, UserIdContext } from '@context';
import { REFRESH } from '@apolloGraphQL/mutation/refreshTokens';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const useRefresh = () => {
  const { setAuth } = useContext(AuthContext);
  const [refresh] = useMutation(REFRESH);
  const { setUserId } = useContext(UserIdContext);
  const router = useRouter();

  const handleRefresh = async () => {
    try {
      await toast.promise(
        async () => {
          const { data } = await refresh();
          if (data.refreshTokens) {
            setAuth(true);
            setUserId(data.refreshTokens.userId);
          }
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
