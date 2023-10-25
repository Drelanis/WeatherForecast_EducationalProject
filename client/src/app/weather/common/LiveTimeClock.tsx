import { Box } from '@mui/material';
import React, { useState, useEffect, FC } from 'react';

interface ILiveTimeClockProps {
  offsetInSeconds: number;
}

const LiveTimeClock: FC<ILiveTimeClockProps> = ({ offsetInSeconds }) => {
  const [utcTime, setUtcTime] = useState(new Date().toUTCString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setUtcTime(new Date().toUTCString());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const time = utcTime.split(' ')[4].split(':');
  const hour = Number(time[0]) + offsetInSeconds / 3600;
  const minute = time[1];

  return (
    <Box sx={{ margin: 'auto', fontSize: '30px' }}>{`${hour}:${minute}`}</Box>
  );
};

export default LiveTimeClock;
