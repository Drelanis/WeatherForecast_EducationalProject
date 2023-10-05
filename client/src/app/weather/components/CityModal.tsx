'use client';
import React, { FC, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddCityButton from 'src/app/weather/components/AddCityButton';
import { Box, CircularProgress } from '@mui/material';
import Search from '@common/Search/Search';
import { modalBoxStyle } from '../styles';
import { FIND_CITIES } from '@apolloGraphQL/query/findCities';
import { ICity } from '@lib/intarfaces';
import { toast } from 'react-toastify';
import useAddCity from '@hooks/useAddCity';

interface IAddCityModalProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  setCities: React.Dispatch<React.SetStateAction<ICity[]>>;
}

const CityModal: FC<IAddCityModalProps> = ({
  open,
  handleOpen,
  handleClose,
  setCities,
}) => {
  const [cityValue, setCityValue] = useState<ICity | null>(null);
  const [cityName, setCityName] = useState<string>('');
  const { data, loading, error } = useQuery(FIND_CITIES, {
    variables: { name: cityName },
  });
  const cities: ICity[] = data ? data.findCities : [];
  if (error) {
    toast.error(error.message);
  }
  const { addNewCity } = useAddCity(
    setCities,
    cityValue,
    handleClose,
    setCityValue
  );

  return (
    <div>
      <AddCityButton onClick={handleOpen} />
      <Modal
        className="add-city-modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="add-city-modal__box" sx={modalBoxStyle}>
          <Search
            data={cities}
            onChangeInput={setCityName}
            onChangeValue={setCityValue}
          />
          {loading && (
            <CircularProgress className="add-city-modal__box_loader" />
          )}
          <Button
            onClick={() => addNewCity()}
            className="add-city-modal__box_button"
            variant="contained"
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CityModal;
