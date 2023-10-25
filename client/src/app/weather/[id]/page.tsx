'use client';
import { FC, useContext, useEffect } from 'react';
import useGetForecastWeather from 'src/app/weather/[id]/hooks/useGetForecastWeather';
import { PageLoadingContext } from '@context';
import WeatherForecastAccordion from './components/Weather Forecast';
import Loader from '@common/Loader';

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

  if (loading) {
    return <Loader />;
  }

  return <WeatherForecastAccordion data={forecastWeather} />;
};

export default WeatherForecast;
