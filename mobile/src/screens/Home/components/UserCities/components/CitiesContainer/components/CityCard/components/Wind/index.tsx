import React, { FC } from 'react';
import { WeatherDescriptionItem, WeatherText } from '../../styled';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface IWindProps {
  speed: number;
}

const Wind: FC<IWindProps> = ({ speed }) => {
  return (
    <WeatherDescriptionItem>
      <Icon name="wind-turbine" size={30} />
      <WeatherText>{`${speed} m/s`}</WeatherText>
    </WeatherDescriptionItem>
  );
};

export default Wind;
