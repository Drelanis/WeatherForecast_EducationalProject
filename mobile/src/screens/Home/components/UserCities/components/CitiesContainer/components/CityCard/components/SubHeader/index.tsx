import React, { FC } from 'react';
import { CityName, WeatherName, WeatherSubHeader } from './styled';

interface ISubHeaderProps {
  cityName: string;
  weatherDescription: string;
}

const SubHeader: FC<ISubHeaderProps> = ({ cityName, weatherDescription }) => {
  return (
    <WeatherSubHeader>
      <CityName>{cityName}</CityName>
      <WeatherName>{weatherDescription}</WeatherName>
    </WeatherSubHeader>
  );
};

export default SubHeader;
