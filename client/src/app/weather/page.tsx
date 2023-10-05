'use client';
import { ICity } from '@lib/intarfaces';
import React, { useEffect, useState } from 'react';
import CityModal from 'src/app/weather/components/CityModal';
import CityCard from './components/CityCard';
import WeatherLoader from './common/WeatherLoader';
import useFindUsersWeather from '@hooks/useFindUsersWeather';

const Weathers = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [cities, setCities] = useState<ICity[]>([]);
  const { loading } = useFindUsersWeather(setCities);

  return (
    <div className="weather-container">
      <CityModal
        open={isOpenModal}
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
        setCities={setCities}
      />
      <WeatherLoader loading={loading} />
      {cities.map((city: ICity) => (
        <CityCard key={city.id} info={city} setCities={setCities} />
      ))}
    </div>
  );
};

export default Weathers;
