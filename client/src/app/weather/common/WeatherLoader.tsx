import { CircularProgress } from '@mui/material';
import React, { FC } from 'react';

interface IWeatherLoaderProps {
  loading: boolean;
}

const WeatherLoader: FC<IWeatherLoaderProps> = ({ loading }) => {
  return (
    loading && (
      <CircularProgress
        style={{ width: '100px', height: '100px', margin: 'auto 0' }}
      />
    )
  );
};

export default WeatherLoader;
