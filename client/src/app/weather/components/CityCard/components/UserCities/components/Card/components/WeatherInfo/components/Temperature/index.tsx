import { Box } from '@mui/material';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import React, { FC } from 'react';

interface ITemperatureProps {
  temp: number;
  feelsLike: number;
}

const Temperature: FC<ITemperatureProps> = ({ temp, feelsLike }) => {
  return (
    <Box sx={{ display: 'flex', marginTop: '10px', marginRight: 'auto' }}>
      <DeviceThermostatIcon />
      <Box>
        {temp}℃ {`(${feelsLike}℃)`}
      </Box>
    </Box>
  );
};

export default Temperature;
