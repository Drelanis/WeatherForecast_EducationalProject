import { TextField } from '@mui/material';
import React, { FC, InputHTMLAttributes } from 'react';
import styles from './index.module.scss';

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
      className={styles.input}
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
