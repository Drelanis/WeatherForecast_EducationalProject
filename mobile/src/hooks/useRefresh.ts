import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { REFRESH } from 'apollo/mutation/refreshTokens';
import { AuthContext, LoadingContext } from 'context/index';
import Toast from 'react-native-toast-message';

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
      Toast.show({
        type: 'error',
        text1: 'Error =(',
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleRefresh };
};

export default useRefresh;
