import { ICity } from 'lib/interfaces';
import React, { FC } from 'react';
import { FlatList } from 'react-native';
import CityCard from './components/CityCard';

interface ICitiesContainerProps {
  cities: ICity[];
  isLoading: boolean;
}

const CitiesContainer: FC<ICitiesContainerProps> = ({ cities, isLoading }) => {
  return (
    <FlatList
      data={cities}
      renderItem={({ item }) => (
        <CityCard
          key={item.id}
          cityId={item.id}
          cityName={`${item.name}, ${item.country}`}
          city={item}
        />
      )}
    />
  );
};

export default CitiesContainer;
