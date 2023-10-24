'use client';
import EmailInput from '@common/Inputes/EmailInput';
import PasswordInput from '@common/Inputes/PasswordInput';
import { Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import useLogin from 'src/app/(auth)/login/hooks/useLogin';
import { PageLoadingContext } from 'src/app/context';
import styles from './index.module.scss';

const Login = () => {
  const { formik } = useLogin();
  const { hideLoader } = useContext(PageLoadingContext);

  useEffect(() => {
    hideLoader();
  }, []);

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        LOGIN
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
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </>
  );
};

export default Login;
