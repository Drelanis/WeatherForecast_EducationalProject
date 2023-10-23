'use client';
import { FC, useContext, useEffect } from 'react';
import useGetForecastWeather from '@hooks/useGetForecastWeather';
import { PageLoadingContext } from '@context';
import WeatherForecastAccordion from './components/Weather Forecast';

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

  if (!forecastWeather) {
    return null;
  }

  return <WeatherForecastAccordion data={forecastWeather} />;
};

export default WeatherForecast;
