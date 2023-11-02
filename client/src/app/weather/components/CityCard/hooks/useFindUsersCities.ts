import { useQuery, useSubscription } from '@apollo/client';
import { FIND_USERS_CITIES } from '@apolloGraphQL/query/findUsersCtites';
import { CITIES_UPDATED } from '@apolloGraphQL/subscriptions/add-city.subscription';
import { UserIdContext } from '@context';
import { ICity } from '@lib/intarfaces';
import { useContext } from 'react';

const useFindUsersCities = (): { cities: ICity[]; loading: boolean } => {
  const { userId } = useContext(UserIdContext);
  const { data, loading } = useQuery(FIND_USERS_CITIES, {
    variables: { identifier: userId },
  });
  const { data: updatedCities } = useSubscription(CITIES_UPDATED, {
    variables: { identifier: userId },
  });

  return {
    loading,
    cities:
      updatedCities?.citiesUpdated?.cities || data?.findUsersCities?.cities,
  };
};

export default useFindUsersCities;
