import { useQuery, useSubscription } from '@apollo/client';
import { FIND_USERS_CITIES } from '@apolloGraphQL/query/findUsersCtites';
import { CITIES_UPDATED } from '@apolloGraphQL/subscriptions/add-city.subscription';
import getUserId from '@lib/helpers/getUserId';
import { ICity } from '@lib/intarfaces';

const useFindUsersCities = (): { cities: ICity[]; loading: boolean } => {
  const { data, loading } = useQuery(FIND_USERS_CITIES, {
    variables: { identifier: getUserId() },
  });
  const { data: updatedCities } = useSubscription(CITIES_UPDATED, {
    variables: { identifier: getUserId() },
  });
  return {
    loading,
    cities:
      updatedCities?.citiesUpdated?.cities || data?.findUsersCities?.cities,
  };
};

export default useFindUsersCities;
