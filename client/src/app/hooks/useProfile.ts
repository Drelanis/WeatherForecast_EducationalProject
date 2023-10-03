import { GET_USER_PROFILE } from '@apolloGraphQL/query/getUserProfile';
import { useQuery } from '@apollo/client';

const useProfile = () => {
  const { data, loading, error } = useQuery(GET_USER_PROFILE, {
    variables: { identifier: 'b710482d-44ec-4e7b-b7c9-e96134b6668d' },
  });

  return { data, loading, error };
};

export default useProfile;
