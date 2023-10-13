'use client';
import React, { useState } from 'react';
import AddCityCard from 'src/app/weather/components/AddCityCard';
import CityCard from './components/CityCard';
import useFindUsersCities from '@hooks/useFindUsersWeather';
import ModalWindow from './common/ModalWindow';

const Weather = () => {
  const { cities, loading } = useFindUsersCities();
  const [isOpenModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);

  return (
    <div className="weather-container">
      <AddCityCard handleOpenModal={handleOpenModal} />
      <CityCard cities={cities} loading={loading} />
      <ModalWindow isOpenModal={isOpenModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default Weather;
