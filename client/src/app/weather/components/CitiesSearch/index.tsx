import { useQuery } from '@apollo/client';
import { FIND_CITIES } from '@apolloGraphQL/query/findCities';
import Search from '@common/Search/Search';
import useAddCity from './hooks/useAddCity';
import { ICity } from '@lib/intarfaces';
import { Box, Button, CircularProgress } from '@mui/material';
import React, { useState, useTransition } from 'react';
import styles from './index.module.scss';

const CitiesSearch = () => {
  const [cityData, setCityData] = useState<ICity | null>(null);
  const [cityName, setCityName] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const { data, loading } = useQuery(FIND_CITIES, {
    variables: { name: cityName },
  });
  const { addNewCity } = useAddCity(cityData, setCityData, setCityName);
  const isLoadingCities: Boolean = loading || isPending;

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setCityName(event.target.value);
    });
  };

  return (
    <Box className={styles.search}>
      <Search
        data={data?.findCities || []}
        onChangeInput={handleInput}
        onChangeValue={setCityData}
        cityName={cityName}
      />
      {isLoadingCities && cityName && (
        <CircularProgress className={styles.loader} />
      )}
      <Button
        disabled={cityData === null}
        onClick={() => addNewCity()}
        className={styles.add}
        variant="contained"
      >
        ADD
      </Button>
    </Box>
  );
};

export default CitiesSearch;
