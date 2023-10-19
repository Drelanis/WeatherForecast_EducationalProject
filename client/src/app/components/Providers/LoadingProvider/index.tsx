import { LoaderContext } from '@context';
import { FC, useState } from 'react';
import { Id, toast } from 'react-toastify';

interface ILoaderProvider {
  children: React.ReactNode;
}

export const LoaderProvider: FC<ILoaderProvider> = ({ children }) => {
  const [loadingId, setLoadingId] = useState<Id | null>(null);

  const showLoader = () => {
    const id = toast.loading('Loading page ...');
    setLoadingId(id);
  };

  const hideLoader = () => {
    if (loadingId !== null) {
      toast.dismiss(loadingId);
      setLoadingId(null);
    }
  };

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};
