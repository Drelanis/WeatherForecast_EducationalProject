'use client';
import EmailInput from '@common/Inputes/EmailInput/EmailInput';
import PasswordInput from '@common/Inputes/PasswordInput/PasswordInput';
import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import useLogin from '@hooks/useLogin';
import { useLoader } from '@hooks/useLoader';

const Login = () => {
  const { formik } = useLogin();
  const { hideLoader } = useLoader();

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
