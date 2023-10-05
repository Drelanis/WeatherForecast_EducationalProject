import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { FC } from 'react';
import { ICity } from '@lib/intarfaces';
import useDeleteCity from '@hooks/useDeleteCity';

interface ICityCardProps {
  info: ICity;
  setCities: React.Dispatch<React.SetStateAction<ICity[]>>;
}

const CityCard: FC<ICityCardProps> = ({ info, setCities }) => {
  const currentWeather = info.weather.currentWeather.currentWeather;
  const { handleDeleteCity } = useDeleteCity(setCities);

  return (
    <div className="city-card">
      <span className="city-card__name">name - {info.name}</span>
      <span className="city-card__country">country - {info.country}</span>
      <span>tempature - {currentWeather.main.temp}</span>
      <span>feels like - {currentWeather.main.feels_like}</span>
      <span>visbility - {currentWeather.main.pressure}</span>
      <span>speedWind - {currentWeather.main.humidity}</span>
      <IconButton
        className="city-card__delete-button"
        data-city-id={info.id}
        onClick={(event) => handleDeleteCity(event)}
        aria-label="delete"
        size="large"
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
};

export default CityCard;
