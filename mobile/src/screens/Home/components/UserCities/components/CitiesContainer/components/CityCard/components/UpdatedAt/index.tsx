import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WeatherDescriptionItem, WeatherText } from '../../styled';
import handleDataTime from 'lib/helpers/handleDataTime';

interface IUpdatedAtProps {
  updatedAt: string;
}

const UpdatedAt: FC<IUpdatedAtProps> = ({ updatedAt }) => {
  return (
    <WeatherDescriptionItem>
      <Icon name="clock" size={30} />
      <WeatherText>{`${handleDataTime(updatedAt)}`}</WeatherText>
    </WeatherDescriptionItem>
  );
};

export default UpdatedAt;
