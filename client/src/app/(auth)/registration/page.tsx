'use client';
import React, { useContext, useEffect } from 'react';
import { Button } from '@mui/material';
import EmailInput from '@common/Inputes/EmailInput';
import FirstNameInput from '@common/Inputes/FirstNameInput';
import LastNameInput from '@common/Inputes/LastNameInput';
import PasswordInput from '@common/Inputes/PasswordInput';
import RepeatPasswordInput from '@common/Inputes/RepeatPasswordInput';
import useRegistration from 'src/app/(auth)/registration/hooks/useRegistration';
import { PageLoadingContext } from 'src/app/context';
import styles from './index.module.scss';

const Registration = () => {
  const { formik } = useRegistration();
  const { hideLoader } = useContext(PageLoadingContext);

  useEffect(() => {
    hideLoader();
  }, []);

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
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
