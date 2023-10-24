import Input from '@common/Input';
import { IInputProps } from '@lib/intarfaces';
import React, { FC } from 'react';
import FormItem from '../FormItem';
import InputError from '../InputError';
import InputLabel from '../InputLabel';

const RepeatPasswordInput: FC<IInputProps> = ({
  value,
  handleChange,
  error,
}) => {
  return (
    <FormItem>
      <InputLabel htmlFor="passwordRepeat">Repeat password</InputLabel>
      <Input
        id="passwordRepeat"
        type="password"
        value={value}
        handleChange={handleChange}
      />
      {error && <InputError>{error}</InputError>}
    </FormItem>
  );
};

export default RepeatPasswordInput;
