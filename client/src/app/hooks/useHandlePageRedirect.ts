import { useRouter } from 'next/navigation';

const useHandlePageRedirect = () => {
  const router = useRouter();
  const handlePageRedirect = (path: string) => {
    router.push(path);
  };

  return { handlePageRedirect };
};

export default useHandlePageRedirect;
