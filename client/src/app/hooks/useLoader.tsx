import { LoaderContext } from '@context';
import { ILoaderContext } from '@lib/intarfaces';
import { useContext } from 'react';

export const useLoader = (): ILoaderContext => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};
