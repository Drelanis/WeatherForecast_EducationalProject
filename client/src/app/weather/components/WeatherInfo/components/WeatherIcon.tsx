import { Avatar } from '@mui/material';
import React from 'react';

const WeatherIcon = ({ weatherInfo }: any) => {
  return (
    <Avatar
      sx={{ margin: '0 auto', width: '60px', height: '60px' }}
      src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}.png`}
    />
  );
};

export default WeatherIcon;
