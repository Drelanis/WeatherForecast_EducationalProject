import { TextField } from '@mui/material';
import React, { FC, InputHTMLAttributes } from 'react';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
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
  ...props
}: any) => {
  return (
    <TextField
      className="form__item_input"
      required
      id={id}
      label="Required"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Input;
