'use client';
import { useQuery } from '@apollo/client';
import { GET_FORECAST_WEATHER } from '@apolloGraphQL/query/getForecastWeather';
import { FC, useEffect, useState } from 'react';
import { IForecastResponse } from '@lib/intarfaces';
import { toast } from 'react-toastify';
import ForecastTable from '../common/ForecastTable';
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
