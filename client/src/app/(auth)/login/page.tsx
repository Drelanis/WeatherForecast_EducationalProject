'use client';
import EmailInput from '@common/Inputes/EmailInput/EmailInput';
import PasswordInput from '@common/Inputes/PasswordInput/PasswordInput';
import { Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import useLogin from '@hooks/useLogin';
import { PageLoadingContext } from '@context';

const Login = () => {
  const { formik } = useLogin();
  const { hideLoader } = useContext(PageLoadingContext);

  useEffect(() => {
    hideLoader();
  }, []);

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="form">
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
