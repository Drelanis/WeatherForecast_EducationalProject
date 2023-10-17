import React, { FC } from 'react';
import WeatherLoader from '../common/WeatherLoader';
import { TransitionGroup } from 'react-transition-group';
import AddCityCard from './AddCityCard';
import useFindUsersCities from '@hooks/useFindUsersWeather';
import UserCities from './UserCities';

interface ICityCardsProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CityCards: FC<ICityCardsProps> = ({ setOpenModal }) => {
  const { cities, loading } = useFindUsersCities();
  const handleOpenModal = () => setOpenModal(true);

  return (
    <TransitionGroup className="city-card-container">
      <AddCityCard handleOpenModal={handleOpenModal} />
      <UserCities cities={cities} />
      <WeatherLoader loading={loading} />
    </TransitionGroup>
  );
};

export default CityCards;
