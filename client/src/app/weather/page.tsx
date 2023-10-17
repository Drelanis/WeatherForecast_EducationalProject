'use client';
import React, { useState } from 'react';
import CityCards from './components/CityCards';
import ModalWindow from './common/ModalWindow';
import { Box } from '@mui/material';

const Weather = () => {
  const [isOpenModal, setOpenModal] = useState(false);

  return (
    <Box className="weather-container">
      <CityCards setOpenModal={setOpenModal} />
      <ModalWindow isOpenModal={isOpenModal} setOpenModal={setOpenModal} />
    </Box>
  );
};

export default Weather;
