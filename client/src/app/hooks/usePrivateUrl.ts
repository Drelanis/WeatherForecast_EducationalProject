import useHandlePageRedirect from './useHandlePageRedirect';

const usePrivateUrl = () => {
  const { handlePageRedirect } = useHandlePageRedirect();

  const handleRedirect = (url: string) => {
    if (!localStorage.getItem('userID')) {
      return handlePageRedirect('/login');
    }
    handlePageRedirect(url);
  };

  return [handleRedirect];
};

export default usePrivateUrl;
