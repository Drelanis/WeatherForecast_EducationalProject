import { Button } from '@mui/material';
import React, { FC, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { ICity } from '@lib/intarfaces';
import styles from './index.module.scss';
import useDeleteCity from './hooks/useDeleteCity';

interface IControllButtonsProps {
  info: ICity;
}

const ControllButtons: FC<IControllButtonsProps> = ({ info }) => {
  const { handleDeleteCity } = useDeleteCity();

  return (
    <Button
      className={styles.button}
      variant="outlined"
      startIcon={<DeleteIcon className={styles.icon} />}
      data-city-id={info?.id}
      onClick={(event) => handleDeleteCity(event)}
    >
      Delete
    </Button>
  );
};

export default ControllButtons;
