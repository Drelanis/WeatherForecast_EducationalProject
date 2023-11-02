import { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_CITY } from 'apollo/mutation/deleteCity';
import { AuthContext } from 'context/index';
import Toast from 'react-native-toast-message';

const useDeleteCity = () => {
  const [deleteCity, { loading }] = useMutation(DELETE_CITY);
  const { auth } = useContext(AuthContext);

  const handleDeleteCity = async (cityId: number) => {
    try {
      await deleteCity({
        variables: {
          userId: auth?.userId,
          cityId: Number(cityId),
        },
      });
      Toast.show({
        type: 'success',
        text1: 'City was deleted',
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error =(',
        text2: error.message,
      });
    }
  };

  return { handleDeleteCity, loading };
};

export default useDeleteCity;
