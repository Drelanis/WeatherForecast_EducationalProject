import { ICity } from '@lib/intarfaces';
import React, { FC } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Card from './components/Card';
import styles from './index.module.scss';

interface IUserCitiesProps {
  cities: ICity[] | undefined;
}

const UserCities: FC<IUserCitiesProps> = ({ cities }) => {
  return (
    <TransitionGroup className={styles.cards}>
      {cities?.map((city: ICity) => (
        <CSSTransition key={city.id} timeout={500} classNames="card">
          <Card key={city.id} data={city} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default UserCities;
