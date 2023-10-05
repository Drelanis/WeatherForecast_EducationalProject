import React, { FC } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ICity } from '@lib/intarfaces';

interface ISearchProps {
  data: ICity[];
  setCityName: React.Dispatch<React.SetStateAction<string>>;
}

const Search: FC<ISearchProps> = ({ data, setCityName }) => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      getOptionLabel={(option) => option.name}
      options={data as ICity[]}
      sx={{ width: 400 }}
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option.id}>
          {`${option.name}, ${option.country}`}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          onChange={(event) => setCityName(event.target.value)}
          {...params}
          label="Search city"
        />
      )}
    />
  );
};

export default Search;
