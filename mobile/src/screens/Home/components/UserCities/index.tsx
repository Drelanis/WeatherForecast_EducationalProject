import React from 'react';
import useFindUsersCities from './hooks/useFindUsersCities';
import ScreenLoader from 'common/ScreenLoader';
import CitiesContainer from './components/CitiesContainer';

const UserCities = () => {
  const { cities, isLoading } = useFindUsersCities();

  if (isLoading) {
    return <ScreenLoader />;
  }
  return <CitiesContainer cities={[...cities]} />;
};

export default UserCities;
