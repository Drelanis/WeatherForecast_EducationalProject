'use client';
import { FC, useContext, useEffect } from 'react';
import useGetForecastWeather from '@hooks/useGetForecastWeather';
import { PageLoadingContext } from '@context';
import { Box } from '@mui/material';

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

  return <Box></Box>;
};

export default WeatherForecast;
