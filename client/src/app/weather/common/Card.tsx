import useDeleteCity from '@hooks/useDeleteCity';
import DeleteIcon from '@mui/icons-material/Delete';
import { ICity } from '@lib/intarfaces';
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import LiveTimeClock from './LiveTimeClock';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';

interface ICardProps {
  info: ICity;
}

const Card: FC<ICardProps> = ({ info }) => {
  const router = useRouter();
  const currentWeather = info.weather.currentWeather.currentWeather;
  const { handleDeleteCity } = useDeleteCity();
  console.log(info);
  return (
    <div className="city-card">
      <Avatar
        sx={{ margin: '0 auto', width: '60px', height: '60px' }}
        src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}
      />
      <Typography
        sx={{ margin: '0 auto' }}
      >{`${currentWeather.weather[0].main} (${currentWeather.weather[0].description})`}</Typography>
      <Typography
        sx={{ margin: '0 auto' }}
      >{`${info.name}, ${info.country}`}</Typography>
      <Box sx={{ display: 'flex' }}>
        <DeviceThermostatIcon />
        <Typography>
          {currentWeather.main.temp}℃ {`(${currentWeather.main.feels_like}℃)`}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <WaterDropIcon />
        <Typography>{currentWeather.main.humidity} %</Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <AirIcon />
        <Typography>{currentWeather.wind.speed} m/s</Typography>
      </Box>
      <LiveTimeClock offsetInSeconds={currentWeather.timezone} />
      <Box className="city-card__control-buttons">
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
      </Box>
    </div>
  );
};

export default Card;
