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
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ margin: 'auto' }}>{`${mainDescription}`}</Box>
      <Box sx={{ margin: 'auto' }}>{`(${extraDescription})`}</Box>
    </Box>
  );
};

export default WeatherDescription;
