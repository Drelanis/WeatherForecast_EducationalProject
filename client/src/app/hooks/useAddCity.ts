import { useMutation } from '@apollo/client';
import { ADD_CITY } from '@apolloGraphQL/mutation/addCity';
import { ICity } from '@lib/intarfaces';
import { SetCities } from '@lib/types';
import { toast } from 'react-toastify';

const useAddCity = (
  setCities: SetCities,
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
    if (cityValue) {
      const userId = localStorage.getItem('userID');
      const { data } = await toast.promise(
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
      console.log(data);
      setCities([...data.addCity.cities]);
    }
    handleClose();
    setCityValue(null);
  };

  return { addNewCity };
};

export default useAddCity;
