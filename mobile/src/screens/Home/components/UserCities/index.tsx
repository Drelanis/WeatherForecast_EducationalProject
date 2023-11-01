import React from 'react';
import useFindUsersCities from './hooks/useFindUsersCities';
import ScreenLoader from 'common/ScreenLoader';
import CitiesContainer from './components/CitiesContainer';

const UserCities = () => {
  const { cities, loading } = useFindUsersCities();
  if (loading) {
    return <ScreenLoader />;
  }
  return <CitiesContainer cities={[...cities]} />;
};

export default UserCities;
