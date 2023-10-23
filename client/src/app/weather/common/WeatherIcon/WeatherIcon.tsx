import { ICurrentWeather, IWeatehrDescription } from '@lib/intarfaces';
import { Avatar } from '@mui/material';
import React, { FC } from 'react';

interface IWeatherIconProps {
  weatherInfo: IWeatehrDescription[];
}

const WeatherIcon: FC<IWeatherIconProps> = ({ weatherInfo }) => {
  return (
    <Avatar
      sx={{ margin: '0 auto', width: '60px', height: '60px' }}
      src={`https://openweathermap.org/img/wn/${weatherInfo[0].icon}.png`}
    />
  );
};

export default WeatherIcon;
