'use client';
import { ICity } from '@lib/intarfaces';
import React, { useState } from 'react';
import AddCityCard from 'src/app/weather/components/CityModal';
import CityCard from './components/CityCard';
import WeatherLoader from './common/WeatherLoader';
import useFindUsersWeather from '@hooks/useFindUsersWeather';

const Weathers = () => {
  const [cities, setCities] = useState<ICity[]>([]);
  const { loading } = useFindUsersWeather(setCities);

  return (
    <div className="weather-container">
      <AddCityCard setCities={setCities} />
      <WeatherLoader loading={loading} />
      {cities.map((city: ICity) => (
        <CityCard key={city.id} info={city} setCities={setCities} />
      ))}
    </div>
  );
};

export default Weathers;
