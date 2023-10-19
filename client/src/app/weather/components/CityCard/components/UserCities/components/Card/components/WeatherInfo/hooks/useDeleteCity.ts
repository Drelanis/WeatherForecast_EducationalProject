import { useMutation } from '@apollo/client';
import { DELETE_CITY } from '@apolloGraphQL/mutation/deleteCity';
import { toast } from 'react-toastify';

const useDeleteCity = () => {
  const [deleteCity] = useMutation(DELETE_CITY);
  const handleDeleteCity = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    const buttonElement = event.currentTarget as HTMLButtonElement;
    const userId = localStorage.getItem('userID');
    const cityId = Number(buttonElement.getAttribute('data-city-id'));
    await toast.promise(
      deleteCity({
        variables: {
          userId,
          cityId: Number(cityId),
        },
      }),
      {
        pending: 'Deleting a city ...',
        success: 'The city is deleted',
        error: 'Error deleting city',
      }
    );
  };

  return { handleDeleteCity };
};

export default useDeleteCity;
