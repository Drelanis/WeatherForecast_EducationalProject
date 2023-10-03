import Input from '@common/Input/Input';
import { IInputProps } from '@models/interfaces/viewInterfaces';
import React, { FC } from 'react';

const PasswordInput: FC<IInputProps> = ({ value, handleChange, error }) => {
  return (
    <div className="form__item">
      <label className="form__item_label" htmlFor="password">
        Password
      </label>
      <Input
        id="password"
        type="password"
        value={value}
        handleChange={handleChange}
      />
      {error && <div className="form__item_error">{error}</div>}
    </div>
  );
};

export default PasswordInput;
