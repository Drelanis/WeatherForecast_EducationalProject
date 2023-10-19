import { useQuery } from '@apollo/client';
import { FIND_CITIES } from '@apolloGraphQL/query/findCities';
import Search from '@common/Search/Search';
import useAddCity from './hooks/useAddCity';
import { ICity } from '@lib/intarfaces';
import { Box, Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import styles from './index.module.scss';

const CitiesSearch = () => {
  const [cityData, setCityData] = useState<ICity | null>(null);
  const [cityName, setCityName] = useState<string>('');
  const { data, loading } = useQuery(FIND_CITIES, {
    variables: { name: cityName },
  });
  const { addNewCity } = useAddCity(cityData, setCityData, setCityName);

  return (
    <Box className={styles.search}>
      <Search
        data={data?.findCities || []}
        onChangeInput={setCityName}
        onChangeValue={setCityData}
        cityName={cityName}
      />
      {loading && cityName && <CircularProgress className={styles.loader} />}
      <Button
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
