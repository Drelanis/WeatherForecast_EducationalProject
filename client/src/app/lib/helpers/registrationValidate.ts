import {
  IRegistrationErrors,
  IRegistrationValues,
} from '@models/interfaces/viewInterfaces';

export const validate = (values: IRegistrationValues) => {
  const errors: IRegistrationErrors = {};
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
  } else if (values.password.length < 4 || values.lastName.length > 20) {
    errors.password = 'Password - must be not less 4 and more than 16';
  }

  if (!values.repeatePassword) {
    errors.repeatePassword = 'Required';
  } else if (values.password !== values.repeatePassword) {
    errors.repeatePassword = 'Password - mismatch';
  }

  return errors;
};
