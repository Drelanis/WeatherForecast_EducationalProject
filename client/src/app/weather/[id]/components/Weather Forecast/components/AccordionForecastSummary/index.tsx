import { AccordionSummary, Typography } from '@mui/material';
import React, { FC } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IForecastWeather } from '@lib/intarfaces';

interface IAccordionForecastSummaryProps {
  weather: [string, IForecastWeather[]];
}

const AccordionForecastSummary: FC<IAccordionForecastSummaryProps> = ({
  weather,
}) => {
  return (
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>{`${weather[0]}, ${
        weather[1][0].dt_txt.split(' ')[0]
      }`}</Typography>
    </AccordionSummary>
  );
};

export default AccordionForecastSummary;
