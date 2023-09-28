export interface IRegistrationValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatePassword: string;
}

export interface IRegistrationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  repeatePassword?: string;
}

export interface IInputProps {
  value: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
  error: string | undefined;
}
