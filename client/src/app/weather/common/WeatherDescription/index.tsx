import { Box } from '@mui/material';
import React, { FC } from 'react';

interface IWeatherDescriptionProps {
  mainDescription: string;
  extraDescription: string;
}

const WeatherDescription: FC<IWeatherDescriptionProps> = ({
  mainDescription,
  extraDescription,
}) => {
  return (
    <Box
      sx={{ margin: '0 auto' }}
    >{`${mainDescription} (${extraDescription})`}</Box>
  );
};

export default WeatherDescription;
