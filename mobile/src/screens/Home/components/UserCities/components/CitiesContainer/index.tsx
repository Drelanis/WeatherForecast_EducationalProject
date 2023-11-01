import { ICity } from 'lib/interfaces';
import React, { FC } from 'react';
import { View, FlatList } from 'react-native';
import CityCard from './components/CityCard';

interface ICitiesContainerProps {
  cities: ICity[];
}

const CitiesContainer: FC<ICitiesContainerProps> = ({ cities }) => {
  return (
    <View>
      <FlatList
        data={cities}
        renderItem={({ item }) => (
          <CityCard
            key={item.id}
            weather={item.weather.currentWeather.currentWeather}
            cityId={item.id}
          />
        )}
      />
    </View>
  );
};

export default CitiesContainer;
