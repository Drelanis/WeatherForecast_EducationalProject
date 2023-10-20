'use client';
import { PageLoadingContext } from '@context';
import { useContext, useEffect } from 'react';

export default function Home() {
  const { hideLoader } = useContext(PageLoadingContext);

  useEffect(() => {
    hideLoader();
  }, []);

  return <></>;
}
