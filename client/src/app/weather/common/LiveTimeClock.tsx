import { Box } from '@mui/material';
import React, { useState, useEffect, FC } from 'react';

interface ILiveTimeClockProps {
  offsetInSeconds: number;
}

const LiveTimeClock: FC<ILiveTimeClockProps> = ({ offsetInSeconds }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const offsetInMillis = (offsetInSeconds - 10800) * 1000;
  const adjustedTimeInMillis = currentTime.getTime() + offsetInMillis;
  const adjustedDate = new Date(adjustedTimeInMillis);

  const hours = adjustedDate.getHours();
  const minutes = adjustedDate.getMinutes();
  const seconds = adjustedDate.getSeconds();

  const formattedHoures = hours.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return (
    <Box
      sx={{ margin: 'auto', fontSize: '30px' }}
    >{`${formattedHoures}:${formattedMinutes}:${formattedSeconds}`}</Box>
  );
};

export default LiveTimeClock;
