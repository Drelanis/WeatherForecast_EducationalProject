import { ICity } from 'lib/interfaces';
import React, { FC, useRef } from 'react';
import { FlatList, ScrollView } from 'react-native';
import CityCard from './components/CityCard';
import useScrollUp from 'hooks/useScrollUp';
import ScrollUpButton from 'common/ScrollUpButton';

interface ICitiesContainerProps {
  cities: ICity[];
}

const CitiesContainer: FC<ICitiesContainerProps> = ({ cities }) => {
  const flatListRef = useRef<any | null>(null);
  const { handleScroll, scrollToTop, isScrolled } = useScrollUp(flatListRef);

  return (
    <>
      <FlatList
        data={cities}
        ref={flatListRef}
        scrollEventThrottle={16}
        onScroll={(event) => handleScroll(event)}
        renderItem={({ item }) => (
          <CityCard
            key={item.id}
            cityId={item.id}
            cityName={`${item.name}, ${item.country}`}
            city={item}
          />
        )}
      />
      {isScrolled && <ScrollUpButton scrollToTop={scrollToTop} />}
    </>
  );
};

export default CitiesContainer;
