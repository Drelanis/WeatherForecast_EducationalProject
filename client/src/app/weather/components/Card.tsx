import { ICity } from '@lib/intarfaces';
import { Box, CircularProgress } from '@mui/material';
import React, { FC } from 'react';
import useCurrentWeather from '@hooks/useCurrentWeather';
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
