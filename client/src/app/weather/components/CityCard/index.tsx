import React, { FC } from 'react';
import useFindUsersCities from 'src/app/weather/components/CityCard/hooks/useFindUsersCities';
import UserCities from './components/UserCities';
import WeatherLoader from '../../common/WeatherLoader';
import { Box } from '@mui/material';

interface ICityCardsProps {}

const CityCards: FC<ICityCardsProps> = () => {
  const { cities, loading } = useFindUsersCities();

  return (
    <Box>
      <UserCities cities={cities} />
      <WeatherLoader loading={loading} />
    </Box>
  );
};

export default CityCards;
