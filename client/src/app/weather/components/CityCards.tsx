import React, { FC } from 'react';
import WeatherLoader from '../common/WeatherLoader';
import { TransitionGroup } from 'react-transition-group';
import useFindUsersCities from '@hooks/useFindUsersCities';
import UserCities from './components/UserCities';

interface ICityCardsProps {}

const CityCards: FC<ICityCardsProps> = () => {
  const { cities, loading } = useFindUsersCities();

  return (
    <TransitionGroup className="city-card-container">
      <UserCities cities={cities} />
      <WeatherLoader loading={loading} />
    </TransitionGroup>
  );
};

export default CityCards;
