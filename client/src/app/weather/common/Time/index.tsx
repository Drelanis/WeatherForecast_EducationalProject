import React, { FC } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box } from '@mui/material';

interface ITimeProps {
  time: string;
}

const Time: FC<ITimeProps> = ({ time }) => {
  return (
    <Box sx={{ display: 'flex', marginTop: '20px', margin: 'auto' }}>
      <AccessTimeIcon />
      <Box sx={{ lineHeight: '24px' }}>{time.split(' ')[1]}</Box>
    </Box>
  );
};

export default Time;
