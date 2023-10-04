import { useRouter } from 'next/navigation';

const usePrivateUrl = () => {
  const router = useRouter();

  const handleRedirect = (url: string) => {
    if (!localStorage.getItem('accessToken')) {
      return router.push('/login');
    }
    router.push(url);
  };

  return [handleRedirect];
};

export default usePrivateUrl;
