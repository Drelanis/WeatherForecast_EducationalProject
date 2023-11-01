import { Dispatch, SetStateAction } from 'react';

export interface ILoginValues {
  email: string;
  password: string;
}

export interface ILoginErrors {
  email?: string;
  password?: string;
}

export interface IAuth {
  isAuth: boolean;
  userId: string;
}

export interface IAuthContext {
  auth: IAuth | null;
  setAuth: Dispatch<SetStateAction<IAuth | null>>;
}

export interface ILoadingContext {
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
