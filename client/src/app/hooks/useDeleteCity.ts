import { useMutation } from '@apollo/client';
import { DELETE_CITY } from '@apolloGraphQL/mutation/deleteCity';
import { SetCities } from '@lib/types';
import { toast } from 'react-toastify';

const useDeleteCity = (setCities: SetCities) => {
  const [deleteCity] = useMutation(DELETE_CITY);
  const handleDeleteCity = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const buttonElement = event.currentTarget as HTMLButtonElement;
    const userId = localStorage.getItem('userID');
    const cityId = Number(buttonElement.getAttribute('data-city-id'));
    const { data } = await toast.promise(
      deleteCity({
        variables: {
          userId,
          cityId: Number(cityId),
        },
      }),
      {
        pending: 'Delete a city ...',
        success: 'The city is deleted',
        error: 'Error deleting city',
      }
    );
    setCities([...data.deleteCity.cities]);
  };

  return { handleDeleteCity };
};

export default useDeleteCity;
