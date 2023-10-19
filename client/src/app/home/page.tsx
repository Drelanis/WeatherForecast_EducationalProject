'use client';
import { useLoader } from '@hooks/useLoader';
import React, { useEffect } from 'react';

const Home = () => {
  const { hideLoader } = useLoader();

  useEffect(() => {
    hideLoader();
  }, []);
  return <></>;
};

export default Home;
