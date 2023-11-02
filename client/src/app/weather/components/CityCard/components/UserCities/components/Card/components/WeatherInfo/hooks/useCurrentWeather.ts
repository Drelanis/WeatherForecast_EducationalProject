import { useQuery, useSubscription } from '@apollo/client';
import { GET_CURRENT_WEATHER } from '@apolloGraphQL/query/getCurrentWeather';
import { UPDATED_CURRENT_WEATHER } from '@apolloGraphQL/subscriptions/updated-current-weather.subscription';
import { ICity } from '@lib/intarfaces';
import { toast } from 'react-toastify';

const useCurrentWeather = (info: ICity) => {
  const { data, loading, error } = useQuery(GET_CURRENT_WEATHER, {
    variables: { cityId: Number(info.id) },
  });

  const { data: currentWeatherUpdated } = useSubscription(
    UPDATED_CURRENT_WEATHER,
    { variables: { id: Number(info.weather.currentWeather.id) } }
  );

  const currentWeather =
    currentWeatherUpdated?.currentWeatherUpdated || data?.getCurrentWeather;

  if (error) {
    toast.error(error.message);
  }

  return { currentWeather, loading };
};

export default useCurrentWeather;
