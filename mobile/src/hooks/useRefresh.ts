import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { REFRESH } from 'apollo/mutation/refreshTokens';
import { AuthContext } from 'context/index';

const useRefresh = () => {
  const { setAuth } = useContext(AuthContext);
  const [refresh] = useMutation(REFRESH);
  const [isLoading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const { data } = await refresh();
      if (data.refreshTokens) {
        setAuth({ isAuth: true, userId: data.refreshTokens.userId });
      }
    } catch (error: any) {
      setAuth({ isAuth: false, userId: '' });
    } finally {
      setLoading(false);
    }
  };

  return { handleRefresh, isLoading };
};

export default useRefresh;
