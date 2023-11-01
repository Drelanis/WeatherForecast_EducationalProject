import { IAuthContext, ILoadingContext } from 'lib/interfaces';
import { createContext } from 'react';

export const AuthContext = createContext<IAuthContext>({
  auth: { isAuth: false, userId: '' },
  setAuth: () => {},
});

export const LoadingContext = createContext<ILoadingContext>({
  isLoading: false,
  setLoading: () => {},
});
