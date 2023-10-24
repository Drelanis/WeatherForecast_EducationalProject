import { Accordion } from '@mui/material';
import React, { FC } from 'react';
import { IForecastResponse } from '@lib/intarfaces';
import getDays from '@lib/helpers/getDays';
import AccordionForecastSummary from './components/AccordionForecastSummary';
import AccrodionForecastDetails from './components/AccrodionForecastDetails';

interface IWeatherForecastAccordionProps {
  data: IForecastResponse | null;
}

const WeatherForecastAccordion: FC<IWeatherForecastAccordionProps> = ({
  data,
}) => {
  if (!data) {
    return null;
  }

  return (
    <>
      {Object.entries(getDays(data?.list)).map((dayForecast, index) => (
        <Accordion key={index}>
          <AccordionForecastSummary weather={dayForecast} />
          <AccrodionForecastDetails data={dayForecast[1]} />
        </Accordion>
      ))}
    </>
  );
};

export default WeatherForecastAccordion;
