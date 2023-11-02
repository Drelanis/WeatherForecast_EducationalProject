import React, { FC } from 'react';
import { Button } from 'react-native-paper';
import useDeleteCity from './hooks/useDeleteCity';
import ScreenLoader from 'common/ScreenLoader';

interface IDeleteButtonProps {
  cityId: number;
}

const DeleteButton: FC<IDeleteButtonProps> = ({ cityId }) => {
  const { handleDeleteCity, loading } = useDeleteCity();

  return (
    <Button
      style={{ backgroundColor: 'rgb(249 136 136)', marginRight: 'auto' }}
      loading={loading}
      icon="delete"
      mode="contained"
      onPress={() => handleDeleteCity(cityId)}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
