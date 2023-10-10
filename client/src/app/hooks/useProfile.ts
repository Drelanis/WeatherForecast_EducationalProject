import { GET_USER_PROFILE } from '@apolloGraphQL/query/getUserProfile';
import { useQuery } from '@apollo/client';
import getUserId from '@lib/helpers/getUserId';

const useProfile = () => {
  const { data, loading, error } = useQuery(GET_USER_PROFILE, {
    variables: { identifier: getUserId() },
  });

  return { data, loading, error };
};

export default useProfile;
