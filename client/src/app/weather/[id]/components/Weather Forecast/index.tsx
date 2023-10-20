import { Accordion, AccordionSummary, Typography } from '@mui/material';
import React, { FC } from 'react';
import { IForecastResponse } from '@lib/intarfaces';
import DailyAccordion from './components/DailyAccordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import getDays from '@lib/helpers/getDays';

interface IWeatherForecastAccordionProps {
  data: IForecastResponse | null;
}

const WeatherForecastAccordion: FC<IWeatherForecastAccordionProps> = ({
  data,
}) => {
  return (
    <>
      {Object.entries(getDays(data?.list)).map((daysForecast, index) => {
        return (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{daysForecast[0]}</Typography>
            </AccordionSummary>
          </Accordion>
        );
      })}
    </>
  );
};

export default WeatherForecastAccordion;
