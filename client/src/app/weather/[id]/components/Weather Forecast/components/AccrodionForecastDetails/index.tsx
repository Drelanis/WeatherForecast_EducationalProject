import { IForecastWeather } from '@lib/intarfaces';
import { AccordionDetails } from '@mui/material';
import React, { FC } from 'react';
import ForecastWeatherCard from './components/ForecastWeatherCard';
import styles from './index.module.scss';

interface IAccrodionForecastDetailsProps {
  data: IForecastWeather[] | undefined;
}

const AccrodionForecastDetails: FC<IAccrodionForecastDetailsProps> = ({
  data,
}) => {
  return (
    <AccordionDetails className={styles.container}>
      {data?.map((weather) => (
        <ForecastWeatherCard key={weather.dt} data={weather} />
      ))}
    </AccordionDetails>
  );
};

export default AccrodionForecastDetails;
