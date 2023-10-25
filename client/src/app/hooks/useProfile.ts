import { GET_USER_PROFILE } from '@apolloGraphQL/query/getUserProfile';
import { useQuery } from '@apollo/client';
import { IUserProfile } from '@lib/intarfaces';
import { useContext } from 'react';
import { UserIdContext } from '@context';

const useProfile = () => {
  const { userId } = useContext(UserIdContext);
  const { data, loading, error } = useQuery<IUserProfile | undefined>(
    GET_USER_PROFILE,
    {
      variables: { identifier: userId },
    }
  );

  return { data, loading, error };
};

export default useProfile;
