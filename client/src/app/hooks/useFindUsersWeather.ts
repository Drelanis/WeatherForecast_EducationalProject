import { useQuery } from '@apollo/client';
import { FIND_USERS_CITIES } from '@apolloGraphQL/query/findUsersCtites';
import getUserId from '@lib/helpers/getUserId';
import { ICity } from '@lib/intarfaces';
import { toast } from 'react-toastify';

const useFindUsersCities = (): { cities: ICity[]; loading: boolean } => {
  const { data, loading, error } = useQuery(FIND_USERS_CITIES, {
    variables: { identifier: getUserId() },
  });

  if (error) {
    toast.error('Error loading data');
  }

  return { cities: data?.findUsersCities?.cities, loading };
};

export default useFindUsersCities;
