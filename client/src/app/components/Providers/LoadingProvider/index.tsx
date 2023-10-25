import { PageLoadingContext } from '@context';
import { FC, useState } from 'react';

interface ILoaderProvider {
  children: React.ReactNode;
}

export const LoaderProvider: FC<ILoaderProvider> = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  const showLoader = () => {
    setLoading(true);
  };

  const hideLoader = () => {
    setLoading(false);
  };

  return (
    <PageLoadingContext.Provider value={{ showLoader, hideLoader, isLoading }}>
      {children}
    </PageLoadingContext.Provider>
  );
};
