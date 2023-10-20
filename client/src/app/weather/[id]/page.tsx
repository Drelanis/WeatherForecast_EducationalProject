'use client';
import { FC, useContext, useEffect } from 'react';
import ForecastTable from './components/ForecastTable';
import useGetForecastWeather from '@hooks/useGetForecastWeather';
import { PageLoadingContext } from '@context';

interface IWeatherForecastProps {
  params: {
    id: string;
  };
}

const WeatherForecast: FC<IWeatherForecastProps> = ({ params }) => {
  const { loading, forecastWeather } = useGetForecastWeather(params);
  const { hideLoader } = useContext(PageLoadingContext);

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
