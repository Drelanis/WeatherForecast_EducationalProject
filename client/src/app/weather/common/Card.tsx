import useDeleteCity from '@hooks/useDeleteCity';
import DeleteIcon from '@mui/icons-material/Delete';
import { ICity } from '@lib/intarfaces';
import { Button, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import LiveTimeClock from './LiveTimeClock';

interface ICardProps {
  info: ICity;
}

const Card: FC<ICardProps> = ({ info }) => {
  const router = useRouter();
  const currentWeather = info.weather.currentWeather.currentWeather;
  const { handleDeleteCity } = useDeleteCity();
  return (
    <div className="city-card">
      <span className="city-card__name">name - {info.name}</span>
      <span className="city-card__country">country - {info.country}</span>
      <span>Tempature - {currentWeather.main.temp}</span>
      <span>Feels like - {currentWeather.main.feels_like}</span>
      <span>Humidity - {currentWeather.main.humidity}</span>
      <span>Pressure - {currentWeather.main.pressure}</span>
      <LiveTimeClock offsetInSeconds={currentWeather.timezone} />
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

export default Card;
