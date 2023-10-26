import React, { FC, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ICity } from '@lib/intarfaces';

interface ISearchProps {
  data: ICity[];
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeValue: React.Dispatch<React.SetStateAction<ICity | null>>;
  cityName: string;
}

const Search: FC<ISearchProps> = ({
  data,
  onChangeInput,
  onChangeValue,
  cityName,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
      renderInput={(params) => {
        return (
          <TextField
            value={cityName}
            inputRef={inputRef}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onChangeInput(event)
            }
            {...params}
            label="Search city"
          />
        );
      }}
    />
  );
};

export default Search;
