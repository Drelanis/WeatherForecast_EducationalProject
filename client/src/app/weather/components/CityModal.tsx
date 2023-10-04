'use client';
import React, { FC, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddCityButton from 'src/app/weather/components/AddCityButton';
import { Box } from '@mui/material';
import Search from '@common/Search/Search';
import { modalBoxStyle } from '../styles';
import { FIND_CITIES } from '@apolloGraphQL/query/findCities';

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
  // const [cityName, setCityName] = useState('');
  // const { data } = useQuery(FIND_CITIES, { variables: { name: cityName } });

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
        <Box sx={modalBoxStyle}>
          <Search data={cities} /*setCityName={setCityName}*/ />
          <Button variant="contained" style={{ marginLeft: '150px' }}>
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

const cities = [
  { id: 1, key: 1, name: 'The Shawshank Redemption', year: 1994 },
  { id: 2, key: 2, name: 'The Godfather', year: 1972 },
  { id: 3, key: 3, name: 'The Godfather: Part II', year: 1974 },
  { id: 4, key: 4, name: 'The Dark Knight', year: 2008 },
  { id: 5, key: 5, name: '12 Angry Men', year: 1957 },
  { id: 6, key: 6, name: "Schindler's List", year: 1993 },
  { id: 7, key: 7, name: 'Pulp Fiction', year: 1994 },
];

export default CityModal;
