import React, { FC } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ICity } from '@lib/intarfaces';

interface ISearchProps {
  data: ICity[];
  onChangeInput: React.Dispatch<React.SetStateAction<string>>;
  onChangeValue: React.Dispatch<React.SetStateAction<ICity | null>>;
}

const Search: FC<ISearchProps> = ({ data, onChangeInput, onChangeValue }) => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      getOptionLabel={(option) => option.name}
      options={data as ICity[]}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(event, value) => onChangeValue(value)}
      sx={{ width: 400 }}
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option.id}>
          {`${option.name}, ${option.country}`}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          onChange={(event) => onChangeInput(event.target.value)}
          {...params}
          label="Search city"
        />
      )}
    />
  );
};

export default Search;
