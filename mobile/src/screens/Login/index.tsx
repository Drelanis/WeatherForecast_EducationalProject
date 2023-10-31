import React, { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Button } from 'react-native-paper';
import { Form } from 'common/Auth/Form';
import { Input, InputContainer } from 'common/Auth/Input';
import loginValidate from 'lib/helpers/loginValidate';
import { ILoginErrors, ILoginValues } from 'lib/interfaces';
import { InputError } from 'common/Auth/InputError';
import useLogin from './hooks/useLogin';
import { AuthContext } from 'context/index';

const LoginForm = ({ navigation }: any) => {
  const [errors, setError] = useState<ILoginErrors | null>(null);
  const { handleLogin } = useLogin();
  const { auth } = useContext(AuthContext);

  const handleSubmit = async (values: ILoginValues) => {
    const errors = loginValidate(values);
    if (Object.keys(errors).length !== 0) {
      setError(errors);
      return;
    }
    await handleLogin(values);
  };

  useEffect(() => {
    if (auth?.isAuth) {
      navigation.navigate('Home');
      return;
    }
  }, [auth]);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <Form>
          <InputContainer>
            <Input
              placeholder="Enter email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors?.email && <InputError>{errors.email}</InputError>}
          </InputContainer>
          <InputContainer>
            <Input
              placeholder="Enter password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry={true}
            />
            {errors?.password && <InputError>{errors.password}</InputError>}
          </InputContainer>
          <Button icon="login" mode="contained" onPress={() => handleSubmit()}>
            LOGIN
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
