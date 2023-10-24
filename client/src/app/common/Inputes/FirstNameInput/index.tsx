import Input from '@common/Input';
import { IInputProps } from '@lib/intarfaces';
import React, { FC } from 'react';
import FormItem from '../FormItem';
import InputError from '../InputError';
import InputLabel from '../InputLabel';

const FirstNameInput: FC<IInputProps> = ({ value, handleChange, error }) => {
  return (
    <FormItem>
      <InputLabel htmlFor="firstName">First Name</InputLabel>
      <Input id="firstName" value={value} handleChange={handleChange} />
      {error && <InputError>{error}</InputError>}
    </FormItem>
  );
};

export default FirstNameInput;
