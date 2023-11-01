import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CITY } from 'apollo/mutation/addCity';
import { AuthContext, LoadingContext } from 'context/index';
import Toast from 'react-native-toast-message';

const useAddCity = (
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  setCityId: React.Dispatch<React.SetStateAction<number | null>>
) => {
  const [addCity] = useMutation(ADD_CITY);
  const { auth } = useContext(AuthContext);
  const { setLoading } = useContext(LoadingContext);

  const addNewCity = async (cityId: number | null) => {
    try {
      setLoading(true);
      await addCity({
        variables: {
          userId: auth?.userId,
          cityId: Number(cityId),
        },
      });
      Toast.show({
        type: 'success',
        text1: 'City added',
      });
      setSearchQuery('');
      setCityId(null);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: `City didn't add`,
      });
    } finally {
      setLoading(false);
    }
  };

  return { addNewCity };
};

export default useAddCity;
