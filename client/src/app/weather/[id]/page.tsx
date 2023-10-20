'use client';
import { FC, useContext, useEffect } from 'react';
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
  console.log(forecastWeather);
  return (
    <>
      <span>{forecastWeather && forecastWeather.city.name}</span>
    </>
  );
};

export default WeatherForecast;
