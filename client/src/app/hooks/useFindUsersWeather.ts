import { useQuery } from '@apollo/client';
import { FIND_USERS_WEATHER } from '@apolloGraphQL/query/findUsersWeather';
import getUserId from '@lib/helpers/getUserId';
import { SetCities } from '@lib/types';
import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';

const useFindUsersWeather = (setCities: SetCities): { loading: boolean } => {
  const userId = getUserId();
  const { data, loading, error } = useQuery(FIND_USERS_WEATHER, {
    variables: { identifier: userId },
  });

  if (error) {
    toast.error('Error loading data');
  }

  useEffect(() => {
    if (!data) {
      return;
    }
    setCities(data.findUsersWeather.cities);
  }, [data]);

  return { loading };
};

export default useFindUsersWeather;
