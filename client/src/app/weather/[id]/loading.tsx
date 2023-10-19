'use client';
import PageLoader from '@common/PageLoader';
import { useLoader } from '@hooks/useLoader';
import React, { useEffect } from 'react';

const Loading = () => {
  const { hideLoader } = useLoader();

  useEffect(() => {
    hideLoader();
  }, []);

  return <PageLoader />;
};

export default Loading;
