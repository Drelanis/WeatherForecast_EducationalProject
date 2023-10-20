import { toast } from 'react-toastify';
import useHandlePageRedirect from './useHandlePageRedirect';

const usePrivateUrl = () => {
  const { handlePageRedirect } = useHandlePageRedirect();

  const handleRedirect = (url: string) => {
    if (!localStorage.getItem('userID')) {
      toast.info('Not authorized');
      return handlePageRedirect('/login');
    }
    handlePageRedirect(url);
  };

  return [handleRedirect];
};

export default usePrivateUrl;
