import React, { FC } from 'react';
import Input from '@common/Input/Input';
import { IInputProps } from '@models/interfaces/viewInterfaces';

const EmailInput: FC<IInputProps> = ({ value, handleChange, error }) => {
  return (
    <div className="form__item">
      <label className="form__item_label" htmlFor="email">
        Email Address
      </label>
      <Input
        id="email"
        value={value}
        handleChange={handleChange}
        placeholder="example@example.example"
      />
      {error && <div className="form__item_error">{error}</div>}
    </div>
  );
};

export default EmailInput;
