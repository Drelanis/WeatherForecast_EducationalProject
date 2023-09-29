import {
  IRegistrationErrors,
  IRegistrationValues,
} from '@models/interfaces/viewInterfaces';

export const registrationValidate = (values: IRegistrationValues) => {
  const errors: Partial<IRegistrationErrors> = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6 || values.lastName.length > 20) {
    errors.password = 'Password - must be not less 6 and more than 16';
  }

  if (!values.passwordRepeat) {
    errors.passwordRepeat = 'Required';
  } else if (values.password !== values.passwordRepeat) {
    errors.passwordRepeat = 'Password - mismatch';
  }

  return errors;
};
