import { useQuery, useSubscription } from '@apollo/client';
import { GET_CURRENT_WEATHER } from 'apollo/query/getCurrentWeather';
import { UPDATED_CURRENT_WEATHER } from 'apollo/subscriptions/updated-current-weather.subscription';
import { ICity } from 'lib/interfaces';

const useCurrentWeather = (info: ICity) => {
  const { data, loading } = useQuery(GET_CURRENT_WEATHER, {
    variables: { cityId: Number(info.id) },
  });

  const { data: currentWeatherUpdated } = useSubscription(
    UPDATED_CURRENT_WEATHER,
    { variables: { id: Number(info.weather.currentWeather.id) } }
  );

  const currentWeather =
    currentWeatherUpdated?.currentWeatherUpdated || data?.getCurrentWeather;

  return { currentWeather, loading };
};

export default useCurrentWeather;
