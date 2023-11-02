import React, { FC } from 'react';
import { WeatherDescriptionItem, WeatherText } from '../../styled';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ITemperatureProps {
  temp: number;
  feelsLike: number;
}

const Temperature: FC<ITemperatureProps> = ({ temp, feelsLike }) => {
  return (
    <WeatherDescriptionItem>
      <Icon name="temperature-celsius" size={30} />
      <WeatherText>{`${temp}°C (${feelsLike}°C)`}</WeatherText>
    </WeatherDescriptionItem>
  );
};

export default Temperature;
