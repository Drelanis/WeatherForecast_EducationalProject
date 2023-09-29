export interface IRegistrationValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

export interface IRegistrationErrors extends IRegistrationValues {}

export interface ILoginValues
  extends Pick<IRegistrationValues, 'email' | 'password'> {}

export interface ILoginErrors
  extends Pick<IRegistrationErrors, 'email' | 'password'> {}

export interface IInputProps {
  value: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
  error: string | undefined;
}
