import { usePathname, useRouter } from 'next/navigation';
import { useLoader } from './useLoader';

const useHandlePageRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { showLoader } = useLoader();
  const handlePageRedirect = (path: string) => {
    if (pathname === path) {
      return;
    }
    showLoader();
    router.push(path);
  };

  return { handlePageRedirect };
};

export default useHandlePageRedirect;
