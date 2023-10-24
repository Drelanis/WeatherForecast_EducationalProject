import React, { FC } from 'react';
import Input from '@common/Input';
import { IInputProps } from '@lib/intarfaces';
import FormItem from '../FormItem';
import InputError from '../InputError';
import InputLabel from '../InputLabel';

const EmailInput: FC<IInputProps> = ({ value, handleChange, error }) => {
  return (
    <FormItem>
      <InputLabel htmlFor="email">Email Address</InputLabel>
      <Input
        id="email"
        value={value}
        handleChange={handleChange}
        placeholder="example@example.example"
      />
      {error && <InputError>{error}</InputError>}
    </FormItem>
  );
};

export default EmailInput;
