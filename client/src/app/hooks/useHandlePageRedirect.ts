import { PageLoadingContext } from '@context';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';

const useHandlePageRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { showLoader } = useContext(PageLoadingContext);
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
