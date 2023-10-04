'use client';
import React, { FC, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddCityButton from 'src/app/weather/components/AddCityButton';
import { Box, CircularProgress } from '@mui/material';
import Search from '@common/Search/Search';
import { modalBoxStyle } from '../styles';
import { FIND_CITIES } from '@apolloGraphQL/query/findCities';
import { ICity } from '@lib/intarfaces';
import { toast } from 'react-toastify';

interface IAddCityModalProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const CityModal: FC<IAddCityModalProps> = ({
  open,
  handleOpen,
  handleClose,
}) => {
  const [cityName, setCityName] = useState('');
  const { data, loading, error } = useQuery(FIND_CITIES, {
    variables: { name: cityName },
  });
  const cities: ICity[] = data ? data.findCities : [];

  if (error) {
    toast.error(error.message);
  }

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
          <Search data={cities} setCityName={setCityName} />
          {loading && (
            <CircularProgress className="add-city-modal__box_loader" />
          )}
          <Button className="add-city-modal__box_button" variant="contained">
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CityModal;
