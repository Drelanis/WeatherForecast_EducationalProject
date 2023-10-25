import { useMutation } from '@apollo/client';
import { ADD_CITY } from '@apolloGraphQL/mutation/addCity';
import { UserIdContext } from '@context';
import { ICity } from '@lib/intarfaces';
import { useContext } from 'react';
import { toast } from 'react-toastify';

const useAddCity = (
  cityData: ICity | null,
  setCityData: React.Dispatch<React.SetStateAction<ICity | null>>,
  setCityName: React.Dispatch<React.SetStateAction<string>>
) => {
  const [addCity] = useMutation(ADD_CITY);
  const { userId } = useContext(UserIdContext);

  const addNewCity = async () => {
    if (!cityData) {
      toast.info('Select a city from the drop-down list');
      return;
    }
    await toast.promise(
      async () => {
        try {
          await addCity({
            variables: {
              userId,
              cityId: Number(cityData.id),
            },
          });

          toast.success('The city is added');
        } catch (error: any) {
          toast.info(error.message);
        }
      },
      {
        pending: 'Add a city ...',
      }
    );
    setCityName('');
    setCityData(null);
  };

  return { addNewCity };
};

export default useAddCity;
