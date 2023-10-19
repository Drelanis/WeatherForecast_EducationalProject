'use client';
import { FC, useEffect } from 'react';
import ForecastTable from './components/ForecastTable';
import useGetForecastWeather from '@hooks/useGetForecastWeather';
import { useLoader } from '@hooks/useLoader';

interface IWeatherForecastProps {
  params: {
    id: string;
  };
}

const WeatherForecast: FC<IWeatherForecastProps> = ({ params }) => {
  const { loading, forecastWeather } = useGetForecastWeather(params);
  const { hideLoader } = useLoader();

  useEffect(() => {
    hideLoader();
  }, []);

  return (
    <>
      <span>{forecastWeather && forecastWeather.city.name}</span>
      <ForecastTable loading={loading} forecastWeather={forecastWeather} />
    </>
  );
};

export default WeatherForecast;
