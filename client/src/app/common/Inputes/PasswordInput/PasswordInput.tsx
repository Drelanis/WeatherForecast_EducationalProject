import { IInputProps } from '@models/interfaces/viewInterfaces';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import React, { FC } from 'react';

const PasswordInput: FC<IInputProps> = ({ value, handleChange, error }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="registration-form__item">
      <label className="registration-form__item_label" htmlFor="password">
        Password
      </label>
      <FormControl
        className="registration-form__item_input"
        sx={{ m: 1, width: '25ch' }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          value={value}
          onChange={handleChange}
          id="password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      {error && <div className="registration-form__item_error">{error}</div>}
    </div>
  );
};

export default PasswordInput;
