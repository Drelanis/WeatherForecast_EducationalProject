import { useQuery } from '@apollo/client';
import { GET_FORECAST_WEATHER } from '@apolloGraphQL/query/getForecastWeather';
import { IForecastResponse } from '@lib/intarfaces';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useGetForecastWeather = (params: { id: string }) => {
  const [forecastWeather, setForecastWeather] =
    useState<IForecastResponse | null>(null);
  const { data, loading, error } = useQuery(GET_FORECAST_WEATHER, {
    variables: { cityId: Number(params.id) },
  });

  useEffect(() => {
    if (error) {
      toast.error('Error loading data');
    }
    if (!data) {
      return;
    }
    setForecastWeather(data.getForecastWeather.forecastWeather);
  }, [data]);

  return { loading, forecastWeather };
};

export default useGetForecastWeather;
