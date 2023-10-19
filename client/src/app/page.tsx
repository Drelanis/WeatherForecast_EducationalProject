'use client';
import { useLoader } from '@hooks/useLoader';
import { useEffect } from 'react';

export default function Home() {
  const { hideLoader } = useLoader();

  useEffect(() => {
    hideLoader();
  }, []);

  return <></>;
}
