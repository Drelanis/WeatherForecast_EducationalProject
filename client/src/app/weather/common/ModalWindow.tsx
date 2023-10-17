'use client';
import React, { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddCityButton from 'src/app/weather/components/components/components/AddCityButton';
import { Box, CircularProgress } from '@mui/material';
import Search from '@common/Search/Search';
import { modalBoxStyle } from '../styles';
import { FIND_CITIES } from '@apolloGraphQL/query/findCities';
import { ICity } from '@lib/intarfaces';
import { toast } from 'react-toastify';
import useAddCity from '@hooks/useAddCity';

interface IModalWindowProps {
  isOpenModal: boolean;
  setOpenModal: (value: React.SetStateAction<boolean>) => void;
}

const ModalWindow: FC<IModalWindowProps> = ({ isOpenModal, setOpenModal }) => {
  const handleCloseModal = () => setOpenModal(false);
  const [cityValue, setCityValue] = useState<ICity | null>(null);
  const [cityName, setCityName] = useState<string>('');
  const { data, loading } = useQuery(FIND_CITIES, {
    variables: { name: cityName },
  });
  const { addNewCity } = useAddCity(cityValue, handleCloseModal, setCityValue);
  return (
    <Modal
      className="add-city-modal"
      open={isOpenModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="add-city-modal__box" sx={modalBoxStyle}>
        <Search
          data={data?.findCities || []}
          onChangeInput={setCityName}
          onChangeValue={setCityValue}
        />
        {loading && <CircularProgress className="add-city-modal__box_loader" />}
        <Button
          onClick={() => addNewCity()}
          className="add-city-modal__box_button"
          variant="contained"
        >
          Add
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalWindow;
