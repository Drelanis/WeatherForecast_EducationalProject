import Input from '@common/Input/Input';
import { IInputProps } from '@models/interfaces/viewInterfaces';
import React, { FC } from 'react';

const LastNameInput: FC<IInputProps> = ({ value, handleChange, error }) => {
  return (
    <div className="registration-form__item">
      <label className="registration-form__item_label" htmlFor="lastName">
        Last Name
      </label>
      <Input id="lastName" value={value} handleChange={handleChange} />
      {error ? (
        <div className="registration-form__item_error">{error}</div>
      ) : null}
    </div>
  );
};

export default LastNameInput;
