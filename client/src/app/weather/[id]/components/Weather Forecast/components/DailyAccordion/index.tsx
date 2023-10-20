import { AccordionSummary, Typography } from '@mui/material';
import React, { FC } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IForecastWeather } from '@lib/intarfaces';
import { daysOfWeek } from '@lib/consts/daysOfWeek';

interface IDailyAccordionProps {
  data: IForecastWeather[] | undefined;
}

const DailyAccordion: FC<IDailyAccordionProps> = ({ data = [] }) => {
  return <></>;
};

export default DailyAccordion;
