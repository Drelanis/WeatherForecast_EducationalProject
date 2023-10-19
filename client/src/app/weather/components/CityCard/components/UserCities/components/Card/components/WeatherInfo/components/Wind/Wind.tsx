import { Box } from '@mui/material';
import React, { FC } from 'react';
import AirIcon from '@mui/icons-material/Air';

interface IWindProps {
  speed: number;
}

const Wind: FC<IWindProps> = ({ speed }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AirIcon />
      <Box>{speed} m/s</Box>
    </Box>
  );
};

export default Wind;
