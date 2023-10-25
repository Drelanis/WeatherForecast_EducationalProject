import { toast } from 'react-toastify';
import useHandlePageRedirect from './useHandlePageRedirect';
import { useContext } from 'react';
import { UserIdContext } from '@context';

const usePrivateUrl = () => {
  const { handlePageRedirect } = useHandlePageRedirect();
  const { userId } = useContext(UserIdContext);

  const handleRedirect = (url: string) => {
    if (!userId) {
      toast.info('Not authorized');
      return handlePageRedirect('/login');
    }
    handlePageRedirect(url);
  };

  return [handleRedirect];
};

export default usePrivateUrl;
