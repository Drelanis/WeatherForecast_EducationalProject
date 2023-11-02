import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WeatherDescriptionItem, WeatherText } from '../../styled';

interface IHumidityProps {
  humidity: number;
}

const Humidity: FC<IHumidityProps> = ({ humidity }) => {
  return (
    <WeatherDescriptionItem>
      <Icon name="water" size={30} />
      <WeatherText>{`${humidity}%`}</WeatherText>
    </WeatherDescriptionItem>
  );
};

export default Humidity;
