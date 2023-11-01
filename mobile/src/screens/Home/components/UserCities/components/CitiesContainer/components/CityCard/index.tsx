import { ICurrentWeatherInfo } from 'lib/interfaces';
import React, { FC } from 'react';
import { CardBox } from './styled';

interface ICityCardProps {
  weather: ICurrentWeatherInfo;
  cityId: number;
}

const CityCard: FC<ICityCardProps> = ({ weather }) => {
  console.log(weather);
  return <CardBox></CardBox>;
};

export default CityCard;
