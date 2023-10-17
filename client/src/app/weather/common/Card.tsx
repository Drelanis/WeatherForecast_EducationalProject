import useDeleteCity from '@hooks/useDeleteCity';
import DeleteIcon from '@mui/icons-material/Delete';
import { ICity } from '@lib/intarfaces';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import LiveTimeClock from './LiveTimeClock';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import useHandlePageRedirect from '@hooks/useHandlePageRedirect';
import useCurrentWeather from '@hooks/useCurrentWeather';
import handleDataTime from '@lib/helpers/handleDataTime';
import UpdateIcon from '@mui/icons-material/Update';

interface ICardProps {
  info: ICity;
}

const Card: FC<ICardProps> = ({ info }) => {
  const { handlePageRedirect } = useHandlePageRedirect();
  const { handleDeleteCity } = useDeleteCity();
  const { currentWeather, loading } = useCurrentWeather(info);

  return (
    <Box className="city-card">
      {loading ? (
        <CircularProgress sx={{ margin: 'auto' }} />
      ) : (
        <>
          <Avatar
            sx={{ margin: '0 auto', width: '60px', height: '60px' }}
            src={`https://openweathermap.org/img/wn/${currentWeather.currentWeather.weather[0].icon}.png`}
          />
          <Typography
            sx={{ margin: '0 auto' }}
          >{`${currentWeather.currentWeather.weather[0].main} (${currentWeather.currentWeather.weather[0].description})`}</Typography>
          <Typography
            sx={{ margin: '0 auto' }}
          >{`${info.name}, ${info.country}`}</Typography>
          <Box sx={{ display: 'flex' }}>
            <DeviceThermostatIcon />
            <Typography>
              {currentWeather.currentWeather.main.temp}℃{' '}
              {`(${currentWeather.currentWeather.main.feels_like}℃)`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <WaterDropIcon />
            <Typography>
              {currentWeather.currentWeather.main.humidity} %
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <AirIcon />
            <Typography>
              {currentWeather.currentWeather.wind.speed} m/s
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <UpdateIcon />
            <Typography>{handleDataTime(currentWeather.updatedAt)}</Typography>
          </Box>
          <LiveTimeClock
            offsetInSeconds={currentWeather.currentWeather.timezone}
          />
          <Box className="city-card__control-buttons">
            <Button
              onClick={() => handlePageRedirect(`/weather/${info.id}`)}
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
        </>
      )}
    </Box>
  );
};

export default Card;
