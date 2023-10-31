import { IAuthContext } from 'lib/interfaces';
import { createContext } from 'react';

export const AuthContext = createContext<IAuthContext>({
  auth: { isAuth: false, userId: '' },
  setAuth: () => {},
});
