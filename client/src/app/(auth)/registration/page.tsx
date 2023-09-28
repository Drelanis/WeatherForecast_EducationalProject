'use client';
import React from 'react';
import { useFormik } from 'formik';
import { Button } from '@mui/material';
import { validate } from '@lib/helpers/registrationValidate';
import { IRegistrationValues } from '@models/interfaces/viewInterfaces';
import EmailInput from '@common/Inputes/EmailInput/EmailInput';
import FirstNameInput from '@common/Inputes/FirstNameInput/FirstNameInput';
import LastNameInput from '@common/Inputes/LastNameInput/LastNameInput';
import PasswordInput from '@common/Inputes/PasswordInput/PasswordInput';
import RepeatPasswordInput from '@common/Inputes/RepeatPasswordInput/RepeatPasswordInput';

const Registration = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatePassword: '',
    },
    validate,
    onSubmit: (values: IRegistrationValues) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="registration-form">
      <FirstNameInput
        value={formik.values.firstName}
        handleChange={formik.handleChange}
        error={formik.errors.firstName}
      />

      <LastNameInput
        value={formik.values.lastName}
        handleChange={formik.handleChange}
        error={formik.errors.lastName}
      />

      <EmailInput
        value={formik.values.email}
        handleChange={formik.handleChange}
        error={formik.errors.email}
      />

      <PasswordInput
        value={formik.values.password}
        handleChange={formik.handleChange}
        error={formik.errors.password}
      />

      <RepeatPasswordInput
        value={formik.values.repeatePassword}
        handleChange={formik.handleChange}
        error={formik.errors.repeatePassword}
      />

      <Button type="submit" variant="contained">
        Registration
      </Button>
    </form>
  );
};

export default Registration;
