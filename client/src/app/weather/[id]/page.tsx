'use client';
import { FC } from 'react';
import ForecastTable from '../components/ForecastTable';
import useGetForecastWeather from '@hooks/useGetForecastWeather';

interface IWeatherForecastProps {
  params: {
    id: string;
  };
}

const WeatherForecast: FC<IWeatherForecastProps> = ({ params }) => {
  const { loading, forecastWeather } = useGetForecastWeather(params);
  return (
    <>
      <span>{forecastWeather && forecastWeather.city.name}</span>
      <ForecastTable loading={loading} forecastWeather={forecastWeather} />
    </>
  );
};

export default WeatherForecast;
