import React, { useContext, useState } from 'react';
import { Button, Searchbar } from 'react-native-paper';
import { SearchAction, SearchContainer } from './styled';
import { Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { FIND_CITIES } from 'apollo/query/findCities';
import { LoadingContext } from 'context/index';
import useAddCity from './hooks/useAddCity';
import CityList from './components/CityListContainer';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityId, setCityId] = useState<number | null>(null);
  const { isLoading } = useContext(LoadingContext);
  const { addNewCity } = useAddCity(setSearchQuery, setCityId);
  const { data, loading } = useQuery(FIND_CITIES, {
    variables: { name: searchQuery },
  });

  return (
    <SearchContainer>
      <SearchAction>
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => {
            setSearchQuery(query);
            setCityId(null);
          }}
          value={searchQuery}
          style={{ flex: 1, marginRight: 5 }}
          loading={loading}
        ></Searchbar>
        <Button
          disabled={cityId ? false : true}
          mode="contained"
          onPress={() => addNewCity(cityId)}
          loading={isLoading}
          contentStyle={{ height: 56 }}
          style={{
            backgroundColor: 'rgb(49, 94, 255)',
            opacity: cityId ? 1 : 0.5,
          }}
          labelStyle={{ color: 'white' }}
        >
          <Text>ADD</Text>
        </Button>
      </SearchAction>
      <CityList
        data={data?.findCities || []}
        setCityId={setCityId}
        setSearchQuery={setSearchQuery}
      />
    </SearchContainer>
  );
};

export default SearchBar;
