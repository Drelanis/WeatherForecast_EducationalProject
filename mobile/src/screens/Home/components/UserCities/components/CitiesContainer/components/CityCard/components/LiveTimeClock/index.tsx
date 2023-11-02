import React, { useState, useEffect, FC } from 'react';
import { Clock } from './styled';

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

  return <Clock>{`${hour}:${minute}`}</Clock>;
};

export default LiveTimeClock;
