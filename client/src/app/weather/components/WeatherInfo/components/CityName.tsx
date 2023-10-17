import { ICity } from '@lib/intarfaces';
import { Box } from '@mui/material';
import React, { FC } from 'react';

interface ICityNameProps {
  info: ICity;
}

const CityName: FC<ICityNameProps> = ({ info }) => {
  return (
    <Box
      sx={{ margin: '0 auto', fontWeight: '700' }}
    >{`${info.name}, ${info.country}`}</Box>
  );
};

export default CityName;
