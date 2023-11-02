import { useQuery, useSubscription } from '@apollo/client';
import { GET_CURRENT_WEATHER } from 'apollo/query/getCurrentWeather';
import { UPDATED_CURRENT_WEATHER } from 'apollo/subscriptions/updated-current-weather.subscription';
import { ICity, ICurrentWeather, ICurrentWeatherInfo } from 'lib/interfaces';
import Toast from 'react-native-toast-message';

const useCurrentWeather = (info: ICity) => {
  const { data, loading, error } = useQuery(GET_CURRENT_WEATHER, {
    variables: { cityId: Number(info.id) },
  });

  const { data: currentWeatherUpdated } = useSubscription(
    UPDATED_CURRENT_WEATHER,
    { variables: { id: Number(info.weather.currentWeather.id) } }
  );

  const currentWeather: ICurrentWeather =
    currentWeatherUpdated?.currentWeatherUpdated || data?.getCurrentWeather;

  if (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error.message,
    });
  }

  return { currentWeather, loading };
};

export default useCurrentWeather;
