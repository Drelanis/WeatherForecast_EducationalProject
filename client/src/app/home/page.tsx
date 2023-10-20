'use client';
import { PageLoadingContext } from '@context';
import React, { useContext, useEffect } from 'react';

const Home = () => {
  const { hideLoader } = useContext(PageLoadingContext);

  useEffect(() => {
    hideLoader();
  }, []);
  return <></>;
};

export default Home;
