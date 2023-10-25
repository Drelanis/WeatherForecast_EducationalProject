'use client';
import { PageLoadingContext } from '@context';
import usePrivateUrl from '@hooks/usePrivateUrl';
import { useContext, useEffect } from 'react';

export default function Home() {
  const { hideLoader } = useContext(PageLoadingContext);
  const [handleRedirect] = usePrivateUrl();

  useEffect(() => {
    hideLoader();
    handleRedirect('/weather');
  }, []);

  return <></>;
}
