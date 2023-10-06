import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { FC } from 'react';
import { ICity } from '@lib/intarfaces';
import useDeleteCity from '@hooks/useDeleteCity';
import { useRouter } from 'next/navigation';

interface ICityCardProps {
  info: ICity;
  setCities: React.Dispatch<React.SetStateAction<ICity[]>>;
}

const CityCard: FC<ICityCardProps> = ({ info, setCities }) => {
  const router = useRouter();
  const currentWeather = info.weather.currentWeather.currentWeather;
  const { handleDeleteCity } = useDeleteCity(setCities);
  return (
    <div className="city-card">
      <span className="city-card__name">name - {info.name}</span>
      <span className="city-card__country">country - {info.country}</span>
      <span>Tempature - {currentWeather.main.temp}</span>
      <span>Feels like - {currentWeather.main.feels_like}</span>
      <span>Humidity - {currentWeather.main.humidity}</span>
      <span>Pressure - {currentWeather.main.pressure}</span>
      <div className="city-card__control-buttons">
        <Button
          onClick={() => router.push(`/weather/${info.id}`)}
          className="city-card__control-buttons_forecast-button"
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
      </div>
    </div>
  );
};

export default CityCard;
