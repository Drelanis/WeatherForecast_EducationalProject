import { ICity } from '@lib/intarfaces';
import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import Card from './components/Card';

interface IUserCitiesProps {
  cities: ICity[] | undefined;
}

const UserCities: FC<IUserCitiesProps> = ({ cities }) => {
  return (
    <>
      {cities?.map((city: ICity) => (
        <CSSTransition key={city.id} timeout={500} classNames="card">
          <Card key={city.id} info={city} />
        </CSSTransition>
      ))}
    </>
  );
};

export default UserCities;
