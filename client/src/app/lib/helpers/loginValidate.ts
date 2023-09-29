import { ILoginErrors, ILoginValues } from '@models/interfaces/viewInterfaces';

export const loginValidate = (values: ILoginValues) => {
  const errors: Partial<ILoginErrors> = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Password - must be not less 6 and more than 16';
  }

  return errors;
};
