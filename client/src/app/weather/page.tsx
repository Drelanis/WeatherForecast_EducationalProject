'use client';
import React, { useState } from 'react';
import CityCards from './components/CityCard';
import useFindUsersCities from '@hooks/useFindUsersWeather';
import ModalWindow from './common/ModalWindow';

const Weather = () => {
  const { cities, loading } = useFindUsersCities();
  const [isOpenModal, setOpenModal] = useState(false);

  return (
    <div className="weather-container">
      <CityCards
        cities={cities}
        loading={loading}
        setOpenModal={setOpenModal}
      />
      <ModalWindow isOpenModal={isOpenModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default Weather;
