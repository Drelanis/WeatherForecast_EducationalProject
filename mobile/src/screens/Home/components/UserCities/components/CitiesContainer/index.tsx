import { ICity } from 'lib/interfaces';
import React, { FC, useCallback, useRef } from 'react';
import { FlatList } from 'react-native';
import CityCard from './components/CityCard';
import useScrollUp from 'hooks/useScrollUp';
import ScrollUpButton from 'common/ScrollUpButton';
import { RefreshControl, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useRefresh from 'hooks/useRefresh';

interface ICitiesContainerProps {
  cities: ICity[];
}

const CitiesContainer: FC<ICitiesContainerProps> = ({ cities }) => {
  const flatListRef = useRef<ScrollView | null>(null);
  const { handleScroll, scrollToTop, isScrolled } = useScrollUp(flatListRef);
  const [refreshing, setRefreshing] = React.useState(false);
  const { handleRefresh } = useRefresh();

  const onRefresh = async () => {
    setRefreshing(true);
    await handleRefresh();
    setRefreshing(false);
  };

  return (
    <>
      <ScrollView
        ref={flatListRef}
        onScroll={(event) => handleScroll(event)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {cities.map((city) => (
          <CityCard
            key={city.id}
            cityId={city.id}
            cityName={`${city.name}, ${city.country}`}
            city={city}
          />
        ))}
      </ScrollView>
      {isScrolled && <ScrollUpButton scrollToTop={scrollToTop} />}
    </>
  );
};

export default CitiesContainer;
