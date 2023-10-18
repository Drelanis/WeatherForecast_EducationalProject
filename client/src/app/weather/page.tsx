'use client';
import React from 'react';
import CityCards from './components/CityCards';
import { Box } from '@mui/material';
import CitiesSearch from './components/CitiesSearch';

const Weather = () => {
  return (
    <Box className="weather-container">
      <CitiesSearch />
      <CityCards />
    </Box>
  );
};

export default Weather;
