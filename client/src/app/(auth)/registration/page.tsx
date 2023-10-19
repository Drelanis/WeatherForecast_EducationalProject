'use client';
import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import EmailInput from '@common/Inputes/EmailInput/EmailInput';
import FirstNameInput from '@common/Inputes/FirstNameInput/FirstNameInput';
import LastNameInput from '@common/Inputes/LastNameInput/LastNameInput';
import PasswordInput from '@common/Inputes/PasswordInput/PasswordInput';
import RepeatPasswordInput from '@common/Inputes/RepeatPasswordInput/RepeatPasswordInput';
import useRegistration from '@hooks/useRegistration';
import { useLoader } from '@hooks/useLoader';

const Registration = () => {
  const { formik } = useRegistration();
  const { hideLoader } = useLoader();

  useEffect(() => {
    hideLoader();
  }, []);

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="form">
        REGISTRATION
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
          value={formik.values.passwordRepeat}
          handleChange={formik.handleChange}
          error={formik.errors.passwordRepeat}
        />
        <Button type="submit" variant="contained">
          Registration
        </Button>
      </form>
    </>
  );
};

export default Registration;
