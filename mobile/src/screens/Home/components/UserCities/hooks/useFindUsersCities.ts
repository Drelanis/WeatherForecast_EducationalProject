import { useQuery, useSubscription } from '@apollo/client';
import { FIND_USERS_CITIES } from 'apollo/query/findUsersCtites';
import { CITIES_UPDATED } from 'apollo/subscriptions/add-city.subscription';
import { AuthContext } from 'context/index';
import { ICity } from 'lib/interfaces';
import { useContext } from 'react';
import Toast from 'react-native-toast-message';

const useFindUsersCities = (): { cities: ICity[]; isLoading: boolean } => {
  const { auth } = useContext(AuthContext);
  const { data, loading, error } = useQuery(FIND_USERS_CITIES, {
    variables: { identifier: auth?.userId },
  });
  const { data: updatedCities } = useSubscription(CITIES_UPDATED, {
    variables: { identifier: auth?.userId },
  });

  if (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error.message,
    });
  }

  return {
    isLoading: loading,
    cities:
      updatedCities?.citiesUpdated?.cities ||
      data?.findUsersCities?.cities ||
      [],
  };
};

export default useFindUsersCities;
