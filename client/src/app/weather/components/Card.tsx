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
import LiveTimeClock from '../common/LiveTimeClock';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import useHandlePageRedirect from '@hooks/useHandlePageRedirect';
import useCurrentWeather from '@hooks/useCurrentWeather';
import handleDataTime from '@lib/helpers/handleDataTime';
import UpdateIcon from '@mui/icons-material/Update';
import WeatherInfo from './WeatherInfo/WeatherInfo';

interface ICardProps {
  info: ICity;
}

const Card: FC<ICardProps> = ({ info }) => {
  const { currentWeather, loading } = useCurrentWeather(info);

  return (
    <Box className="city-card">
      {loading ? (
        <CircularProgress sx={{ margin: 'auto' }} />
      ) : (
        <WeatherInfo currentWeather={currentWeather} info={info} />
      )}
    </Box>
  );
};

export default Card;
