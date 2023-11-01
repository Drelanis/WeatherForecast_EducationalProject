import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { REFRESH } from 'apollo/mutation/refreshTokens';
import { AuthContext, LoadingContext } from 'context/index';

const useRefresh = () => {
  const { setAuth } = useContext(AuthContext);
  const [refresh] = useMutation(REFRESH);
  const { setLoading } = useContext(LoadingContext);

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

  return { handleRefresh };
};

export default useRefresh;
