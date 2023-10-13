import React, { FC } from 'react';
import { ICity } from '@lib/intarfaces';
import Card from '../common/Card';
import WeatherLoader from '../common/WeatherLoader';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import AddCityCard from './AddCityCard';

interface ICityCardsProps {
  cities: ICity[];
  loading: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CityCards: FC<ICityCardsProps> = ({ cities, loading, setOpenModal }) => {
  const handleOpenModal = () => setOpenModal(true);
  if (loading) {
    return <WeatherLoader loading={loading} />;
  }

  return (
    <TransitionGroup className="city-card-container">
      <AddCityCard handleOpenModal={handleOpenModal} />
      {cities?.map((city: ICity) => (
        <CSSTransition key={city.id} timeout={500} classNames="card">
          <Card key={city.id} info={city} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default CityCards;
