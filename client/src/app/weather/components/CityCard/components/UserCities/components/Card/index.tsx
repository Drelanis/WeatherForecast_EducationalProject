import { ICity } from '@lib/intarfaces';
import { Button } from '@mui/material';
import React, { FC } from 'react';
import WeatherInfo from './components/WeatherInfo';
import styles from './index.module.scss';
import useHandlePageRedirect from '@hooks/useHandlePageRedirect';
import ControllButtons from './components/ControllButtons';

interface ICardProps {
  data: ICity;
}

const Card: FC<ICardProps> = ({ data }) => {
  const { handlePageRedirect } = useHandlePageRedirect();

  return (
    <Button
      disabled={false}
      onClick={() => handlePageRedirect(`/weather/${data.id}`)}
      className={styles.card}
    >
      <WeatherInfo data={data} />
      <ControllButtons info={data} />
    </Button>
  );
};

export default Card;
