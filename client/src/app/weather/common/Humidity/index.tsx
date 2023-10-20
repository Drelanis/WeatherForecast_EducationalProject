import React, { FC } from 'react';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { Box } from '@mui/material';

interface IWeatherDescriptionProps {
  humidity: number;
}

const Humidity: FC<IWeatherDescriptionProps> = ({ humidity }) => {
  return (
    <Box sx={{ display: 'flex', marginRight: 'auto' }}>
      <WaterDropIcon />
      <Box>{humidity} %</Box>
    </Box>
  );
};

export default Humidity;
