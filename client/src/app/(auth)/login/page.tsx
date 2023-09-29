'use client';
import { useMutation } from '@apollo/client';
import EmailInput from '@common/Inputes/EmailInput/EmailInput';
import PasswordInput from '@common/Inputes/PasswordInput/PasswordInput';
import { loginValidate as validate } from '@lib/helpers/loginValidate';
import { ILoginValues } from '@models/interfaces/viewInterfaces';
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { LOGIN } from '@apollo/mutation/login';
import { toast } from 'react-toastify';

const Login = () => {
  const [login] = useMutation(LOGIN);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values: ILoginValues, { resetForm }) => {
      try {
        const { email, password } = values;
        resetForm({
          values: {
            email,
            password,
          },
        });
        await toast.promise(
          login({
            variables: {
              email,
              password,
            },
          }),
          {
            pending: 'Login...',
          }
        );
        toast.success('User is authorized');
      } catch (error: any) {
        toast.error(error.message);
      }
    },
  });

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
