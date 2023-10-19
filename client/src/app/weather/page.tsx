'use client';
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import CitiesSearch from './components/CitiesSearch';
import CityCards from './components/CityCard';
import styles from './index.module.scss';
import { useLoader } from '@hooks/useLoader';

const Weather = () => {
  const { hideLoader } = useLoader();

  useEffect(() => {
    hideLoader();
  }, []);

  return (
    <Box className={styles.weather}>
      <CitiesSearch />
      <CityCards />
    </Box>
  );
};

export default Weather;
