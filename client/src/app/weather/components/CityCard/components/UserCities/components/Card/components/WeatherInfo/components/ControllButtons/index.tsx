import { Box, Button, IconButton } from '@mui/material';
import React, { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { ICity } from '@lib/intarfaces';
import styles from './index.module.scss';

interface IControllButtonsProps {
  info: ICity;
  handlePageRedirect: (path: string) => void;
  handleDeleteCity: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
}

const ControllButtons: FC<IControllButtonsProps> = ({
  info,
  handlePageRedirect,
  handleDeleteCity,
}) => {
  return (
    <Box className={styles.container}>
      <Button
        onClick={() => handlePageRedirect(`/weather/${info.id}`)}
        className={styles.forecast}
        variant="contained"
      >
        FORECAST
      </Button>
      <IconButton
        className="city-card__control-buttons_delete-button"
        data-city-id={info.id}
        onClick={(event) => handleDeleteCity(event)}
        aria-label="delete"
        size="large"
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
};

export default ControllButtons;
