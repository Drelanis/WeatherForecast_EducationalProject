'use client';
import React, { useContext, useEffect } from 'react';
import { Box } from '@mui/material';
import CitiesSearch from './components/CitiesSearch';
import CityCards from './components/CityCard';
import styles from './index.module.scss';
import { PageLoadingContext } from 'src/app/context';

const Weather = () => {
  const { hideLoader } = useContext(PageLoadingContext);

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
