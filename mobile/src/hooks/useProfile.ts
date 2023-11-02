import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from 'context/index';
import { GET_USER_PROFILE } from 'apollo/query/getUserProfile';
import { IUserProfile } from 'lib/interfaces';

const useProfile = () => {
  const { auth } = useContext(AuthContext);
  const { data, loading, error } = useQuery<IUserProfile | undefined>(
    GET_USER_PROFILE,
    {
      variables: { identifier: auth?.userId },
    }
  );

  return { data, loading, error };
};

export default useProfile;
