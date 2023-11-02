import React, { FC } from 'react';
import { WeatherIcon } from './styled';

interface IIconProps {
  icon: string;
}

const CardIcon: FC<IIconProps> = ({ icon }) => {
  return (
    <WeatherIcon
      source={{
        uri: `https://openweathermap.org/img/wn/${icon}.png`,
      }}
    />
  );
};

export default CardIcon;
