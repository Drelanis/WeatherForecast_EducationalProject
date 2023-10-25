import { useMutation } from '@apollo/client';
import { DELETE_CITY } from '@apolloGraphQL/mutation/deleteCity';
import { UserIdContext } from '@context';
import { useContext } from 'react';
import { toast } from 'react-toastify';

const useDeleteCity = () => {
  const [deleteCity] = useMutation(DELETE_CITY);
  const { userId } = useContext(UserIdContext);

  const handleDeleteCity = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    const buttonElement = event.currentTarget as HTMLButtonElement;
    buttonElement.setAttribute('disabled', 'true');
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
    buttonElement.removeAttribute('disabled');
  };

  return { handleDeleteCity };
};

export default useDeleteCity;
