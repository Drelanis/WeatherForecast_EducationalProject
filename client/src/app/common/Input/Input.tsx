import { TextField } from '@mui/material';
import React, { FC } from 'react';

interface IInputProps {
  id: string;
  value: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
  placeholder?: string;
}

const Input: FC<IInputProps> = ({
  id,
  value,
  handleChange,
  placeholder,
}: any) => {
  return (
    <TextField
      className="registration-form__item_input"
      required
      id={id}
      label="Required"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
