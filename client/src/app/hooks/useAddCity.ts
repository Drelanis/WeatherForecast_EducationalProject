import { useMutation } from '@apollo/client';
import { ADD_CITY } from '@apolloGraphQL/mutation/addCity';
import { ICity } from '@lib/intarfaces';
import { toast } from 'react-toastify';

const useAddCity = (
  cityValue: ICity | null,
  handleClose: () => void,
  setCityValue: React.Dispatch<React.SetStateAction<ICity | null>>
) => {
  const [addCity] = useMutation(ADD_CITY);

  const addNewCity = async () => {
    if (!cityValue) {
      toast.info('Select a city from the drop-down list');
      return;
    }
    const userId = localStorage.getItem('userID');
    await toast.promise(
      addCity({
        variables: {
          userId,
          cityId: Number(cityValue.id),
        },
      }),
      {
        pending: 'Add a city ...',
        success: 'The city is added',
        error: 'Error adding city',
      }
    );
    handleClose();
    setCityValue(null);
  };

  return { addNewCity };
};

export default useAddCity;
