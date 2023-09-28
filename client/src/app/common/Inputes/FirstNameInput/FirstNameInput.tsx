import Input from '@common/Input/Input';
import { IInputProps } from '@models/interfaces/viewInterfaces';
import React, { FC } from 'react';

const FirstNameInput: FC<IInputProps> = ({ value, handleChange, error }) => {
  return (
    <div className="registration-form__item">
      <label className="registration-form__item_label" htmlFor="firstName">
        First Name
      </label>
      <Input id="firstName" value={value} handleChange={handleChange} />
      {error && <div className="registration-form__item_error">{error}</div>}
    </div>
  );
};

export default FirstNameInput;