import useHandlePageRedirect from './useHandlePageRedirect';
import { useContext } from 'react';
import { AuthContext } from '@context';

const usePrivateUrl = () => {
  const { handlePageRedirect } = useHandlePageRedirect();
  const { isAuth } = useContext(AuthContext);

  const handleRedirect = async (url: string) => {
    if (!isAuth) {
      return handlePageRedirect('/login');
    }
    handlePageRedirect(url);
  };

  return [handleRedirect];
};

export default usePrivateUrl;
