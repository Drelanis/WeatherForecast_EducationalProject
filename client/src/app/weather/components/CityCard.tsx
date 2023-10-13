import React, { FC } from 'react';
import { ICity } from '@lib/intarfaces';
import Card from '../common/Card';
import WeatherLoader from '../common/WeatherLoader';

interface ICityCardProps {
  cities: ICity[];
  loading: boolean;
}

const CityCard: FC<ICityCardProps> = ({ cities, loading }) => {
  if (loading) {
    return <WeatherLoader loading={loading} />;
  }

  return (
    <>
      {cities?.map((city: ICity) => (
        <Card key={city.id} info={city} />
      ))}
    </>
  );
};

export default CityCard;
